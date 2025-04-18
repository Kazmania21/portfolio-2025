const express = require('express');
const path = require('path');
const multer = require('multer');
const authMiddleware = require('./middleware/authorization.js');
const storage = require('./multer_storage.js');

class ServerRoute {
    constructor(database_connector, model, insert_form=null) {
        this.database_connector = database_connector;
        this.model = model;
        this.insert_form = insert_form;
        //console.log(this.model);
        //console.log(insert_form);
		this.upload = multer({storage});
        this.router = express.Router("");
        this.initRoutes();
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
    }

    initRoutes = () => {
        this.router.get('/', this.index);
        this.router.get('/:id', this.get_id);
        this.router.get('/:id/:item', this.get_id);
        this.router.get('/:id/:item/:id2', this.get_id);
        this.router.post('/', authMiddleware, this.upload.array("imageFile"), this.create);
        this.router.put('/:id', authMiddleware, this.upload.array("imageFile"), this.updateOne);
		this.router.patch('/:id/add', authMiddleware, this.upload.array("imageFile"), this.patchAddOne);
		this.router.patch('/:id/remove', authMiddleware, this.upload.array("imageFile"), this.patchRemoveOne);
        this.router.delete('/:id', authMiddleware, this.deleteOne);
    }

    getPopulatePaths(schemaPaths = this.model.schema.paths) {
        const populatePaths = [];

        for (const [path, schemaType] of Object.entries(schemaPaths)) {
            if (schemaType.options && schemaType.options.ref) {
                const refModel = this.database_connector.model(schemaType.options.ref);
                const nestedPaths = this.getPopulatePaths(refModel.schema.paths).map(
                    (nestedPath) => nestedPath
                );
                populatePaths.push({path: path, populate: nestedPaths});
            } else if (schemaType.schema) {
                const nestedPaths = this.getPopulatePaths(schemaType.schema.paths).map(
                    (nestedPath) => nestedPath
                );
                populatePaths.push({path: path, populate: nestedPaths});
            }
			//console.log(path);
        }

        return populatePaths;
    };

	getLookupStages(schemaPaths = this.model.schema.paths, prefix = '') {
    	const lookupStages = [];
		const group = {};

		for (const [path, schemaType] of Object.entries(schemaPaths)) {
			if (prefix == "") {	
				if (path == "_id") {
				    group[path] = `$${path}`;
				}
				else {
					group[path] = {$first: `$${path}`};
				}
			}
		}

    	for (const [path, schemaType] of Object.entries(schemaPaths)) {
			var isArray = schemaType.instance === 'Array';

        	const fullPath = prefix ? `${prefix}.${path}` : path;
			if (isArray) {
				lookupStages.push(
					{$unwind: {path: `$${fullPath}`, preserveNullAndEmptyArrays: true}}
				)
			}

        	if (schemaType.options && schemaType.options.ref) {
            	// Get referenced model and schema
            	const refModel = this.database_connector.model(schemaType.options.ref);
            	const nestedLookups = this.getLookupStages(refModel.schema.paths, fullPath);

				

            	// Add $lookup and optionally $unwind
            	lookupStages.push(
                	{
                    	$lookup: {
                        	from: refModel.collection.name,
                        	localField: fullPath,
                        	foreignField: "_id",
                        	as: fullPath,
                    	},
                	},
                	{
                    	$unwind: {
                        	path: `$${fullPath}`,
                        	preserveNullAndEmptyArrays: true, // Keep null if no match
                    	},
                	}, 
            	);
            	lookupStages.push(...nestedLookups);

            	// Add nested lookups if the referenced model has more refs
            	//lookupStages.push(...nestedLookups);
        	} else if (schemaType.schema) {
            	// Handle nested subdocuments
            	const nestedLookups = this.getLookupStages(schemaType.schema.paths, fullPath);
            	lookupStages.push(...nestedLookups);
        	}	
			/*if (isArray) {
				lookupStages.push(
					{$unwind: `$${fullPath}`}
				)
			}*/
			if (isArray & prefix == "") {
				console.log(group);
				if (((schemaType.options && schemaType.options.ref) || schemaType.schema)) {
				group[path] = {$push: { 
				  	$cond: [
      					{ $gt: [{ $size: { $objectToArray: `$${path}` } }, 0] },
      					`$${path}`,
      					"$$REMOVE"
    				]}};
				}
				else {
					group[path] = {$push: `$${path}`};
				}
		    	lookupStages.push({$group: structuredClone(group)});
				group[path] = {$first: `$${path}`};
		    	//lookupStages.push({$group: path});
			}
    	}
		
		/*if (prefix == "") {
			console.log(group);
		    lookupStages.push({$group: group});
		    //lookupStages.push({$group: path});
		}*/
    	return lookupStages;
	}

    index = async (req, res) => {
		const { groupBy, sortBy, sortOrder, ...conditions } = req.query;

        const populateFields = this.getPopulatePaths();

        var query = this.model.find(conditions).populate(populateFields);

		if (sortBy) {
		  for (const field of sortBy.split(",")) {
          	const order = sortOrder === 'desc' ? -1 : 1; // Default to ascending if sortOrder isn't provided
          	query = query.sort({ [sortBy]: order });
		  }
        }

        // Grouping logic (optional)
        if (groupBy) {
		  const lookupStages = this.getLookupStages();
		  console.log(lookupStages);
		  var pipeline = [
			...lookupStages,
			/*{
			$unwind: "$urls", // Unwind the urls array
		  },
		  {
			$lookup: {
			  from: "projecturltypes", // Join with the urltypes collection
			  localField: "urls.type",
			  foreignField: "_id",
			  as: "urls.type",
			},
		  },
		  {
			$unwind: {
			  path: "$urls.type",
			  //preserveNullAndEmptyArrays: true, // Optional: in case there's no match
			},
		  },
		  {
			$group: {
			  _id: "$_id",
			  name: { $first: "$name" },
			  tagline: { $first: "$tagline" },
			  urls: { $push: "$urls" }, // Reconstruct the urls array
			},
		  },*/
            //{ $match: conditions },  // Apply conditions
          ]
		  //console.log(pipeline); 
		  pipeline.push({
  			$addFields: {
    		  [`${groupBy}_group`]: `$${groupBy}`
  			}
		  });
		  pipeline.push({ $unwind: `$${groupBy}_group` });
		  pipeline.push({
            $group: {
              _id: `$${groupBy}_group`, // Group by specified field
              data: { $push: "$$ROOT" } // Push documents to 'data' array
			}
          });
		  if (sortBy) {
			var sortData = {};
			sortBy.split(",").forEach((field, index) => {
			  var order = 1;
			  if (sortOrder) {
			  	order = sortOrder[index] === 'desc' ? -1 : 1;  // Default to ascending if sortOrder is missing
			  }
              sortData[`data.${field}`] = order;
			});
			console.log(sortData);
			pipeline.push({
              $sort: sortData
            });
		  }
          // In Mongoose, grouping is done using aggregation, not the find method
          query = this.model.aggregate(pipeline);
        }

        query.then(results => {
		  /*console.log(groupBy);
		  if (groupBy) {
			const groupedResults = Object.groupBy(results, item => item[groupBy]);
			console.log(groupedResults);
			res.json(groupedResults);
		  }*/
          res.json(results);
        })

        .catch(err => {
          res.status(500).json({'error': 'Error fetching results:', 'details': err.message});
        })
    }

    get_id = async (req, res) => {
        const id = req.params.id;
        const subitem = req.params.item;
        const id2 = req.params.id2;

        const schemaPaths = this.model.schema.paths;

        const populateFields = Object.keys(schemaPaths).filter(
            (path) => schemaPaths[path].options && schemaPaths[path].options.ref
        );

        try {
            const item = await this.model.findById(id).populate(populateFields);
            if (subitem) {
                if (id2) {
                    for (var row of item[subitem]) {
                        console.log(row)
                        if (row["_id"] == id2) {
                            res.json(row);
                        }
                    }
                }
                else {
                    res.json(item[subitem]);
                }
            }
            else {
                res.json(item);
            }
        } catch (err) {
            res.json({"message": err.message});
        }
    }

    create = async (req, res) => {
		console.log(`Content Type: ${req.headers['content-type']}`);
        console.log(req.body);
		console.log(req.body.urls);
        console.log(this.insert_form.validate(req));
        var fields = {...req.body};
        /*for (var key of Object.keys(req.body)) {
            if (key.includes("File")) {
                var new_key = key.replace("File", "_location");
                fields[new_key] = `static/images/${req.body[key]}`;
            }

			//if key.includes() {
//
			//}
        }*/
		if (req.files) {
		  for (var file of req.files) {
            fields[file.fieldname.replace("File", "_location")] = `static/images/${file.filename}`;
		  }
		}
        //console.log("fields");
        //console.log(fields);
        const newDocument = new this.model(fields);
        console.log(newDocument)
        newDocument.save()
          .then(data => res.json({'message': 'Data saved:', 'data': data}))
          //.then(data => res.redirect("/projects"))
          .catch(err => res.json({'message': err.message}));
    }

    updateAll = async (req, res) => {
        console.log(req.body);
        console.log(this.insert_form.validate(req));
        const newDocument = new this.model(req.body);
        console.log(newDocument)
        newDocument.save()
          .then(data => res.json({'message': 'Data saved:', 'data': data}))
          .catch(err => res.json({'message': err.message}));
    }

    updateOne = async (req, res) => {
		console.log(req.headers['content-type']);
		console.log(req.body);
        const id = req.params.id;
        try {
          const updatedItem = await this.model.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
          );

          if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
          }

          res.status(200).json(updatedItem);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Error updating item", error });
        }
    }

	patchAddOne = async (req, res) => {
		console.log(req.headers['content-type']);
        const id = req.params.id;
		console.log(req.body);
        try {
          const updatedItem = await this.model.findByIdAndUpdate(
            id,
		    {$push: req.body},
            { new: true }
          );

          if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
          }

          res.status(200).json(updatedItem);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Error updating item", error });
        }
    }

	patchRemoveOne = async (req, res) => {
        const id = req.params.id;
		console.log(req.body);
        try {
          const updatedItem = await this.model.findByIdAndUpdate(
            id,
		    {$pull: req.body},
            { new: true }
          );

          if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
          }

          res.status(200).json(updatedItem);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Error updating item", error });
        }
    }



    deleteOne = async (req, res) => {
        const id = req.params.id;
        try {
          const updatedItem = await this.model.findByIdAndDelete(
            id
          );

          if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
          }

          res.status(200).json(updatedItem);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Error updating item", error });
        }
    }
}

module.exports = ServerRoute
