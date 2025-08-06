const Response = require('../utils/response.js');

class CrudQueryExecutor {
  constructor(databaseConnector, model) {
    this.databaseConnector = databaseConnector;
    this.model = model;
  };

  getPopulatePaths(schemaPaths = this.model.schema.paths) {
    const populatePaths = [];

    for (const [path, schemaType] of Object.entries(schemaPaths)) {
      if (schemaType.options && schemaType.options.ref) {
        const refModel = this.databaseConnector.model(schemaType.options.ref);
        const nestedPaths = this.getPopulatePaths(refModel.schema.paths).map(
          (nestedPath) => nestedPath
        );
        populatePaths.push({ path: path, populate: nestedPaths });
      } else if (schemaType.schema) {
        const nestedPaths = this.getPopulatePaths(schemaType.schema.paths).map(
          (nestedPath) => nestedPath
        );
        populatePaths.push({ path: path, populate: nestedPaths });
      }
    }

    return populatePaths;
  };

  getLookupStages(schemaPaths = this.model.schema.paths, prefix = '') {
    const lookupStages = [];
    const group = {};

    for (const path of Object.keys(schemaPaths)) {
      if (prefix === '') { 
        if (path === '_id') {
          group[path] = `$${path}`;
        }
        else {
          group[path] = { $first: `$${path}` };
        }
      }
    }

    for (const [path, schemaType] of Object.entries(schemaPaths)) {
      const isArray = schemaType.instance === 'Array';

      const fullPath = prefix ? `${prefix}.${path}` : path;
      if (isArray) {
        lookupStages.push(
          { $unwind: { path: `$${fullPath}`, preserveNullAndEmptyArrays: true } }
        );
      }

      if (schemaType.options && schemaType.options.ref) {
        // Get referenced model and schema
        const refModel = this.databaseConnector.model(schemaType.options.ref);
        const nestedLookups = this.getLookupStages(refModel.schema.paths, fullPath);

        // Add $lookup and optionally $unwind
        lookupStages.push(
          {
            $lookup: {
              from: refModel.collection.name,
              localField: fullPath,
              foreignField: '_id',
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
     
      if (isArray & prefix === '') {
        if (((schemaType.options && schemaType.options.ref) || schemaType.schema)) {
          group[path] = { $push: { 
            $cond: [
              { $gt: [{ $size: { $objectToArray: `$${path}` } }, 0] },
              `$${path}`,
              '$$REMOVE'
            ] } };
        }
        else {
          group[path] = { $push: `$${path}` };
        }
        lookupStages.push({ $group: structuredClone(group) });
        group[path] = { $first: `$${path}` };
      }
    }
        
    return lookupStages;
  };

  read = async (conditions = [], groupBy = false, sortBy = false, sortOrder = '') => {
    const populateFields = this.getPopulatePaths();

    let query = this.model.find(conditions).populate(populateFields);

    if (sortBy) {
      for (const _ of sortBy.split(',')) {
        // Default to ascending if sortOrder isn't provided
        const order = sortOrder === 'desc' ? -1 : 1; 
        query = query.sort({ [sortBy]: order });
      }
    }

    // Grouping logic
    if (groupBy) {
      const lookupStages = this.getLookupStages();
      const pipeline = [
        ...lookupStages,
      ];
      pipeline.push({
        $addFields: {
          [`${groupBy}_group`]: `$${groupBy}`
        }
      });
      pipeline.push({ $unwind: `$${groupBy}_group` });
      pipeline.push({
        $group: {
          _id: `$${groupBy}_group`, // Group by specified field
          data: { $push: '$$ROOT' } // Push documents to 'data' array
        }
      });
      if (sortBy) {
        const sortData = {};
        sortBy.split(',').forEach((field, index) => {
          let order = 1;
          if (sortOrder) {
            // Default to ascending if sortOrder is missing
            order = sortOrder[index] === 'desc' ? -1 : 1;  
          }
          sortData[`data.${field}`] = order;
        });
        pipeline.push({
          $sort: sortData
        });
      }
      // In Mongoose, grouping is done using aggregation, not the find method
      query = this.model.aggregate(pipeline);
    }

    return query.then(results => {
      return new Response(200, { 'data': results });
    })
      .catch(err => {
        return new Response(500, { 'message': 'Internal Server Error.', 'errors': [err] });
      });
  };

  readById = async (id, subitem, id2) => {
    const schemaPaths = this.model.schema.paths;

    const populateFields = Object.keys(schemaPaths).filter(
      (path) => schemaPaths[path].options && schemaPaths[path].options.ref
    );

    try {
      const item = await this.model.findById(id).populate(populateFields).lean();
      if (subitem) {
        if (id2) {
          for (const row of item[subitem]) {
            console.log(row);
            if (row['_id'] === id2) {
              return new Response(200, { 'data': row });
            }
          }
        }
        else {
          return new Response(200, { 'data': item[subitem] });
        }
      }
      else {
        return new Response(200, { 'data': item });
      }
    } catch (err) {
      return new Response(500, { 'message': 'Internal Server Error', 'errors': [err.message] });
    }
  };

  create = (fields = {}) => {
    const newDocument = new this.model(fields);
    console.log(newDocument);
    return newDocument.save()
      .then(data => new Response(200, { 'message': 'Data saved:', 'data': data }))
      .catch(err => {
        new Response(400, { 'message': 'Error saving data.', 'errors': [err.message] });
      });
  };

  updateAll = (fields) => {
    const newDocument = new this.model(fields);
    console.log(newDocument);
    return newDocument.save()
      .then(data => new Response(200, { 'message': 'Data saved:', 'data': data }))
      .catch(err => {
        return new Response(400, { 'message': 'Error updating data.', 'errors': [err.message] });
      });
  };

  updateOne = async (id, fields) => {
    try {
      const updatedItem = await this.model.findByIdAndUpdate(
        id,
        fields,
        { new: true }
      );

      if (!updatedItem) {
        return new Response(404, { errors: ['Item not found'] });
      }

      return new Response(200, { data: updatedItem });
    } catch (error) {
      console.log(error);
      return new Response(500, { 'message': 'Error updating item', 'errors': [error.message] } );
    }
  };

  patchAddOne = async (id, fields) => {
    try {
      const updatedItem = await this.model.findByIdAndUpdate(
        id,
        { $push: fields },
        { new: true }
      );

      if (!updatedItem) {
        return new Response(404, { 'errors': 'Item not found' });
      }

      return new Response(200, { data: updatedItem });
    } catch (error) {
      console.log(error);
      return new Response(500, { message: 'Error updating item', errors: [error.message] });
    }
  };

  patchRemoveOne = async (id, fields) => {
    try {
      const updatedItem = await this.model.findByIdAndUpdate(
        id,
        { $pull: fields },
        { new: true }
      );

      if (!updatedItem) {
        return new Response(404, { errors: ['Item not found'] });
      }

      return new Response(200, { data: updatedItem });
    } catch (error) {
      console.log(error);
      return new Response(500, { message: 'Error updating item', errors: [error.message] });
    }
  };

  deleteOne = async (id) => {
    try {
      const updatedItem = await this.model.findByIdAndDelete(
        id
      );

      if (!updatedItem) {
        return new Response(404, { errors: ['Item not found'] });
      }

      return new Response(200, { data: updatedItem });
    } catch (error) {
      console.log(error);
      return new Response(500, { message: 'Error updating item', errors: [error.message] });
    }
  };
}

module.exports = CrudQueryExecutor;
