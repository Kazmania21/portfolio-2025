const express = require('express');
const path = require('path');
const multer = require('multer');
const authMiddleware = require('../middleware/authorization.js');
const validateForm = require('../middleware/validate_form.js');
const Response = require('../utils/response.js');
const storage = require('../utils/multer_storage.js');

class ServerRoute {
    constructor(crud_query_executor, crud_file_manager, insert_form=null) {
        this.crud_query_executor = crud_query_executor;
        this.crud_file_manager = crud_file_manager;
        this.insert_form = insert_form;
        //console.log(this.model);
        //console.log(insert_form);
        this.upload = multer({storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 }});
        this.router = express.Router("");
        this.initRoutes();
        //this.index = this.index.bind(this);
        //this.create = this.create.bind(this);
    }

    initRoutes = () => {
        this.router.get('/', this.index);
        this.router.get('/:id', this.get_id);
        this.router.get('/:id/:item', this.get_id);
        this.router.get('/:id/:item/:id2', this.get_id);
        this.router.post('/', authMiddleware, this.upload.array("imageFile"), validateForm(this.insert_form), this.create);
        this.router.put('/:id', authMiddleware, this.upload.array("imageFile"), this.updateOne);
        this.router.patch('/:id/add', authMiddleware, this.upload.array("imageFile"), this.patchAddOne);
        this.router.patch('/:id/remove', authMiddleware, this.upload.array("imageFile"), this.patchRemoveOne);
        this.router.delete('/:id', authMiddleware, this.deleteOne);
    }

    index = async (req, res) => {
        const { groupBy, sortBy, sortOrder, ...conditions } = req.query;
        const response = await this.crud_query_executor.read(conditions, groupBy, sortBy, sortOrder);
        //console.log(`Results: ${data}`);
        res.status(response.status).json(response.getResponse());
    }

    get_id = async (req, res) => {
        const id = req.params.id;
        const subitem = req.params.item;
        const id2 = req.params.id2;
        const response = await this.crud_query_executor.read_by_id(id, subitem, id2);
        res.status(response.status).json(response.getResponse());
    }

    create = async (req, res) => {
        //console.log(`Content Type: ${req.headers['content-type']}`);
        console.log(req.body);
        //console.log(req.body.urls);
        var files = this.crud_file_manager.createFiles(req.files);
        var fields = {...req.body, ...files};
        const response = await this.crud_query_executor.create(fields);
        res.status(response.status).json(response.getResponse()); 
    }

    updateAll = async (req, res) => {
        console.log(req.body);
        console.log(this.insert_form.validate(req));
        const response = await this.crud_query_executor.updateAll(req.body);
        res.status(response.status).json(response.getResponse());
    }

    updateOne = async (req, res) => {
        console.log(req.headers['content-type']);
        console.log(req.body);
        const id = req.params.id;

        var item = (await this.crud_query_executor.read_by_id(id))
        var oldFiles = [];
        console.log(item);
        for (const [field, value] of Object.entries(item)) {
          console.log(`${field}: ${value}`);
          if (field.includes("_location")) {
            oldFiles.push(value);
          }
        }

        var files = [];

        if (req.files) {
          files = this.crud_file_manager.updateFiles(oldFiles, req.files);
        }

        var fields = {...req.body, ...files};

        const response = await this.crud_query_executor.updateOne(id, fields);
        res.status(response.status).json(response.getResponse());
    }

    patchAddOne = async (req, res) => {
        console.log(req.headers['content-type']);
        const id = req.params.id;
        console.log(req.body);
        const response = await this.crud_query_executor.patchAddOne(id, req.body);
        res.status(response.status).json(response.getResponse());
    }

    patchRemoveOne = async (req, res) => {
        const id = req.params.id;
        console.log(req.body);
        const response = await this.crud_query_executor.patchRemoveOne(id, req.body);
        res.status(response.status).json(response.getResponse());
    }

    deleteOne = async (req, res) => {
        const id = req.params.id;
        var item = (await this.crud_query_executor.read_by_id(id))
        var files = [];
        console.log(item);
        for (const [field, value] of Object.entries(item)) {
          console.log(`${field}: ${value}`);
          if (field.includes("_location")) {
            files.push(value);
          }
        }
        console.log(files);
        this.crud_file_manager.deleteFiles(files);
        const response = await this.crud_query_executor.deleteOne(id);
        res.status(response.status).json(response.getResponse());
    }
}

module.exports = ServerRoute
