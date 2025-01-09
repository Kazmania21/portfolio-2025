const { MongoClient } = require('mongodb');

class MongoDBDatabaseConnector {
    constructor(connection_string) {
        this.uri = connection_string;
        this.client = new MongoClient(this.uri);
        //this.uri = this.uri.bind(this);
        //this.client = this.client.bind(this);
    }

    async execute_query_function(query_function) {
        try {
            await this.client.connect();
            return await query_function();
        } catch(error) {
            console.log(error.message);
        } finally {
            await this.client.close();
            console.log("client closed");
        }
    }
}
module.exports = MongoDBDatabaseConnector;
