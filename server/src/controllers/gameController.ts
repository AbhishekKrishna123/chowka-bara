import { Database } from "../database";
import MongoClient, { Cursor, ObjectId } from "mongodb";
import { Path, GET, PathParam, QueryParam } from "typescript-rest";
import { Player } from "../models/Player";


@Path("/api/game")
export class GameController {

    @GET
    @Path("/new")
    async newGame(@QueryParam("name") name: string) {

        const result = await Database.db.collection("game").insertOne({
            name: name,
            createdDateTime: new Date()
        });

        return {
            _id: result.insertedId
        };
    }

    @GET
    @Path("/join")
    async joinGame(@QueryParam("_id") _id: string, @QueryParam("name") name: string) {

        const db: MongoClient.Db = Database.db;

        const cursor = await Database.db.collection("game").find({
            _id: new ObjectId(_id)
        });

        const result: any = (await cursor.toArray())[0];

        console.log(result._id);

        result.name = name;
        result.modifiedDateTime = new Date();

        const update = {
            $set: {
                name: name,
            },
            $currentDate: {
                modifiedDateTime: true
            }

        };

        // update the game
        await db.collection("game").updateOne({_id: result._id}, update);

        return result;
    }

    @GET
    @Path("/status")
    async gameStatus(@QueryParam("_id") _id: string): Promise<any> {

        const cursor: Cursor = await Database.db.collection("game").find({
            _id: new ObjectId(_id)
        });

        try {
            const result = (await cursor.toArray())[0];
            return result;
        } catch {
            console.log("ERROR");
        }
    }

}
