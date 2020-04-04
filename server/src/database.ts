import MongoClient from "mongodb";
import * as secrets from "./util/secrets";

export class Database {

    static options: any = {
        useUnifiedTopology: true
    };
    static dbName = "default";
    static client: MongoClient.MongoClient = null;
    static db: MongoClient.Db = null;
    static url = secrets.MONGODB_URI;

    static async connect(): Promise<MongoClient.Db> {
        if (this.db) {
            return this.db;
        }
        try {
            this.client = await MongoClient.connect(this.url, this.options);
            this.db = await this.client.db(this.dbName);
            console.log("Connected to DB!");
            return this.db;
        } catch {
            console.log("Error: Could not connect to DB!");
        }
    }

    static async disconnect(): Promise<any> {
        if (this.client) {
            await this.client.close();
        }
    }
}
