const express = require('express');
const path = require('path');
const multer = require('multer');

class ServerRoute {
    constructor(database_connector, model, insert_form=null) {
        this.database_connector = database_connector;
        this.model = model;
        this.insert_form = insert_form;
        //console.log(this.model);
        //console.log(insert_form);
		this.upload = multer({dest: "uploads/images"});
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
        this.router.post('/', this.upload.array("imageFile"), this.create);
        this.router.put('/:id', this.updateOne);
		this.router.patch('/:id/add', this.patchAddOne);
		this.router.patch('/:id/remove', this.patchRemoveOne);
        this.router.delete('/:id', this.deleteOne);
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
        }

        return populatePaths;
    };

    index = async (req, res) => {
        const conditions = req.query;

        const populateFields = this.getPopulatePaths();

        this.model.find(conditions).populate(populateFields)
          .then(results => {
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
		console.log(req.headers['content-type']);
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
		for (var file of req.files) {
          fields[file.fieldname.replace("File", "_location")] = `static/images/${file.filename}`;
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
