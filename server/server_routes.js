const express = require('express');
const path = require('path');

class ServerRoute {
    constructor(database_connector, model, insert_form=null) {
        this.database_connector = database_connector;
        this.model = model;
        this.insert_form = insert_form;
        //console.log(this.model);
        //console.log(insert_form);
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
        this.router.post('/', this.create);
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
        console.log(req.body);
        console.log(this.insert_form.validate(req));
        const newDocument = new this.model(req.body);
        console.log(newDocument)
        newDocument.save()
          .then(data => res.json({'message': 'Data saved:', 'data': data}))
          .catch(err => res.json({'message': err.message}));
    }
}

module.exports = ServerRoute
