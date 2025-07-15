const express = require('express');
const path = require('path');
const multer = require('multer');
const authMiddleware = require('./middleware/authorization.js');
const storage = require('./multer_storage.js');

class ServerRoute {
    constructor(crud_query_executor, insert_form=null) {
		this.crud_query_executor = crud_query_executor;
        this.insert_form = insert_form;
        //console.log(this.model);
        //console.log(insert_form);
		this.upload = multer({storage});
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
        this.router.post('/', authMiddleware, this.upload.array("imageFile"), this.create);
        this.router.put('/:id', authMiddleware, this.upload.array("imageFile"), this.updateOne);
		this.router.patch('/:id/add', authMiddleware, this.upload.array("imageFile"), this.patchAddOne);
		this.router.patch('/:id/remove', authMiddleware, this.upload.array("imageFile"), this.patchRemoveOne);
        this.router.delete('/:id', authMiddleware, this.deleteOne);
    }

    index = async (req, res) => {
		const { groupBy, sortBy, sortOrder, ...conditions } = req.query;
		const data = await this.crud_query_executor.read(conditions, groupBy, sortBy, sortOrder);
		//console.log(`Results: ${data}`);
		res.json(data);
    }

    get_id = async (req, res) => {
        const id = req.params.id;
        const subitem = req.params.item;
        const id2 = req.params.id2;
		const data = await this.crud_query_executor.read_by_id(id, subitem, id2);
        res.json(data);
    }

    create = async (req, res) => {
		console.log(`Content Type: ${req.headers['content-type']}`);
        console.log(req.body);
		console.log(req.body.urls);
        console.log(this.insert_form.validate(req));
        var fields = {...req.body};
		const response = await this.crud_query_executor.create(fields, req.files);
        res.json(response); 
    }

    updateAll = async (req, res) => {
        console.log(req.body);
        console.log(this.insert_form.validate(req));
        const response = await this.crud_query_executor.updateAll(req.body);
		res.json(response);
    }

    updateOne = async (req, res) => {
		console.log(req.headers['content-type']);
		console.log(req.body);
        const id = req.params.id;
        const response = await this.crud_query_executor.updateOne(id, req.body);
		res.json(response);
    }

	patchAddOne = async (req, res) => {
		console.log(req.headers['content-type']);
        const id = req.params.id;
		console.log(req.body);
        const response = await this.crud_query_executor.patchAddOne(id, req.body);
		res.json(response);
    }

	patchRemoveOne = async (req, res) => {
        const id = req.params.id;
		console.log(req.body);
        const response = await this.crud_query_executor.patchRemoveOne(id, req.body);
		res.json(response);
    }

    deleteOne = async (req, res) => {
        const id = req.params.id;
        const response = await this.crud_query_executor.deleteOne(id);
		res.json(response);
    }
}

module.exports = ServerRoute
