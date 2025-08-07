const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authorization.js');
const validateForm = require('../middleware/validate_form.js');

class ServerRoute {
  constructor(crudQueryExecutor, crudFileManager, {insertForm = null, patchForm = null} = {}) {
    this.crudQueryExecutor = crudQueryExecutor;
    this.crudFileManager = crudFileManager;
    this.insertForm = insertForm;
    this.patchForm = patchForm;
    const fileSize = { fileSize: 2 * 1024 * 1024 };
    this.upload = multer({ storage: multer.memoryStorage(), limits: fileSize });
    this.router = express.Router('');
    this.initRoutes();
  }

  initRoutes = () => {
    // Middleware constants
    const auth = authMiddleware;
    const uploadImages = this.upload.array('imageFile');
    const validateInsertForm = validateForm(this.insertForm);
    const validateUpdateForm = validateForm(this.insertForm, { isUpdating: true });
    const validatePatchForm = validateForm(this.patchForm, { isUpdating: true });

    // Route definitions
    this.router.get('/', this.index);
    this.router.get('/:id', this.getById);
    this.router.get('/:id/:item', this.getById);
    this.router.get('/:id/:item/:id2', this.getById);
    this.router.post('/', auth, uploadImages, validateInsertForm, this.create);
    this.router.put('/:id', auth, uploadImages, validateUpdateForm, this.updateOne);
    this.router.patch('/:id/add', auth, uploadImages, validatePatchForm, this.patchAddOne);
    this.router.patch('/:id/remove', auth, uploadImages, validatePatchForm, this.patchRemoveOne);
    this.router.delete('/:id', auth, this.deleteOne);
  };

  index = async (req, res) => {
    const { groupBy, sortBy, sortOrder, ...conditions } = req.query;
    const response = await this.crudQueryExecutor.read(conditions, groupBy, sortBy, sortOrder);
    res.status(response.status).json(response.getResponse());
  };

  getById = async (req, res) => {
    const id = req.params.id;
    const subitem = req.params.item;
    const id2 = req.params.id2;
    const response = await this.crudQueryExecutor.readById(id, subitem, id2);
    res.status(response.status).json(response.getResponse());
  };

  create = async (req, res) => {
    console.log(req.body);
    const files = this.crudFileManager.createFiles(req.files);
    const fields = { ...req.body, ...files };
    const response = await this.crudQueryExecutor.create(fields);
    res.status(response.status).json(response.getResponse()); 
  };

  updateAll = async (req, res) => {
    console.log(req.body);
    console.log(this.insertForm.validate(req));
    const response = await this.crudQueryExecutor.updateAll(req.body);
    res.status(response.status).json(response.getResponse());
  };

  updateOne = async (req, res) => {
    console.log(req.headers['content-type']);
    console.log(req.body);
    const id = req.params.id;

    const item = (await this.crudQueryExecutor.readById(id));
    const oldFiles = [];
    console.log(item);
    for (const [field, value] of Object.entries(item)) {
      console.log(`${field}: ${value}`);
      if (field.includes('_location')) {
        oldFiles.push(value);
      }
    }

    let files = [];

    if (req.files) {
      files = this.crudFileManager.updateFiles(oldFiles, req.files);
    }

    const fields = { ...req.body, ...files };

    const response = await this.crudQueryExecutor.updateOne(id, fields);
    res.status(response.status).json(response.getResponse());
  };

  patchAddOne = async (req, res) => {
    console.log(req.headers['content-type']);
    const id = req.params.id;
    console.log(req.body);
    const response = await this.crudQueryExecutor.patchAddOne(id, req.body);
    res.status(response.status).json(response.getResponse());
  };

  patchRemoveOne = async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    const response = await this.crudQueryExecutor.patchRemoveOne(id, req.body);
    res.status(response.status).json(response.getResponse());
  };

  deleteOne = async (req, res) => {
    const id = req.params.id;
    const item = (await this.crudQueryExecutor.readById(id));
    const files = [];
    console.log(item);
    for (const [field, value] of Object.entries(item)) {
      console.log(`${field}: ${value}`);
      if (field.includes('_location')) {
        files.push(value);
      }
    }
    console.log(files);
    this.crudFileManager.deleteFiles(files);
    const response = await this.crudQueryExecutor.deleteOne(id);
    res.status(response.status).json(response.getResponse());
  };
}

module.exports = ServerRoute;
