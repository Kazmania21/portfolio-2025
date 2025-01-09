// Import the necessary modules
const express = require('express');
const path = require('path');

// Define your class
class ServerRoute {
    //constructor(file) {
    //constructor(database_connector, resource) {
    constructor(database_connector, model, subroutes) {
        this.database_connector = database_connector;
        this.model = model;
        this.subroutes = subroutes
        this.router = express.Router("");
        this.initRoutes();
        //this.file = file;
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
        //this.file = this.file.bind(this);
        //console.log(this.file)
    }

    initRoutes = () => {
        this.router.get('/', this.index);
        this.router.get('/:id', this.get_id);
        this.router.get('/:id/:item', this.get_id);
        this.router.get('/:id/:item/:id2', this.get_id);
        this.router.post('/', this.create);

        /*for (subroute in this.subroutes) {
            this.router.get(`/${subroute}`, this.index);
            //this.router.get(`/:id/${subroute}`, this.get_id);
            this.router.post(`/${subroute}`, this.create);
        }*/
        // Add more routes as needed
    }

    index = async (req, res) => {
        //res.sendFile(path.join(__dirname, this.file));
        /*var database_connector = this.database_connector
        var resource = this.resource

        async function view_function() {
            const db = database_connector.client.db("test2");
            const collection = db.collection(resource);
            const results = await collection.find().toArray();
            console.log(results)
            return results;
        }

        var results = await this.database_connector.execute_query_function(view_function)
        res.send(results);*/
        const conditions = req.query;
        // console.log(conditions)

        // Fetch all users
        this.model.find(conditions)
          .then(results => {
            /*console.log(results)
            console.log(`results: ${results}`)
            console.log(results)*/
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
        //const conditions = req.query.conditions;
        /*this.model.findById(id, (err, item) => {
          if (err) {
            res.status(500).json({'error': 'Error fetching results:', 'details': err.message});
          } else {
            res.json(item);
          }
        })*/

        try {
            const item = await this.model.findById(id);
            if (subitem) {
                if (id2) {
                    for (var row of item[subitem]) {
                        console.log(row)
                        if (row["_id"] == id2) {
                            res.json(row);
                        }
                    }
                    //res.send("Sorry we could not find what you are looking for.");
                }
                else {
                    res.json(item[subitem]);
                }
            }
            else {
                res.json(item);
            }
        } catch (err) {
            //console.log(err)
            res.json({"message": err.message});
        }
    }

    create = async (req, res) => {
        //res.send('POST route');
        //res.sendFile(path.join(__dirname, this.file));
        /*var database_connector = this.database_connector
        var resource = this.resource

        async function post_function() {
            const db = database_connector.client.db("test2");
            const collection = db.collection(resource);
            const results = await collection.find().toArray();
            console.log(results)
            return results;
        }

        var results = await this.database_connector.execute_query_function(post_function)
        res.send(results);*/

        /*const newUser = new this.model({ name: 'Bob', age: 34, email: 'bob@example.com' });
        newUser.save()
          .then(user => res.json({'message': 'User saved:', 'user': user}))
          .catch(err => res.json({'message': err.message}));*/
        //console.log(req.data);
        console.log(req.body);
        const newDocument = new this.model(req.body);
        newDocument.save()
          .then(data => res.json({'message': 'Data saved:', 'data': data}))
          .catch(err => res.json({'message': err.message}));
    }
}

module.exports = ServerRoute
