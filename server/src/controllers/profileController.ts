import { Database } from "../database";
import MongoClient, { Cursor, ObjectId } from "mongodb";
import { Path, GET, PathParam, QueryParam, PUT, POST, DELETE } from "typescript-rest";
import { Profile } from "../models/Profile";


@Path("/api/profile")
export class ProfileController {

    collection: string = "profile";

    /**
     * create new profile
     * @param name profile name
     */
    @POST
    @Path("/:name")
    async createProfile(@PathParam("name") name: string) {

        const profile = new Profile();
        profile.name = name;
        profile.createdDateTime = new Date();
        profile.modifiedDateTime = new Date();

        try {
            let result = await Database.db.collection(this.collection).insertOne(profile);
            return {
                _id: result.insertedId
            };
        } catch {
            throw new Error("Error creating profile!");
        }
    }

    /**
     * get the profile associated with specified id
     * @param _id profile id
     */
    @GET
    @Path("/:_id")
    async getProfile(@PathParam("_id") _id: string) {

        try {
            let cursor = await Database.db.collection(this.collection).find({
                _id: new ObjectId(_id)
            });

            let result = (await cursor.toArray())[0];

            return result;
        } catch {
            throw new Error("Error getting profile!");
        }
    }

    /**
     * get all profiles
     */
    @GET
    async getAllProfiles() {

        try {
            let cursor = await Database.db.collection(this.collection).find();

            let result = (await cursor.toArray());

            return result;
        } catch {
            throw new Error("Error getting all profiles!");
        }
    }

    // @PUT
    // @Path("/:_id")
    // async updateProfile(@PathParam("_id") _id: string) {

    //     let cursor = await Database.db.collection("profile").find({
    //         _id: new ObjectId(_id)
    //     });

    //     try {
    //         let result = (await cursor.toArray())[0];
    //         return result;
    //     } catch {
    //         console.log("ERROR");
    //     }
    // }

    @DELETE
    @Path("/:_id")
    async deleteProfile(@PathParam("_id") _id: string) {

        try {
            await Database.db.collection(this.collection).deleteOne({
                _id: new ObjectId(_id)
            })
        } catch {
            throw new Error("Error deleting profile!");
        }
    }

}
