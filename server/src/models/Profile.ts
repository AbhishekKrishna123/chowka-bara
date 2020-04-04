import { BaseModel } from "./BaseModel";
import { ObjectId } from "mongodb";

export class Profile extends BaseModel {
    _id: ObjectId;
    createdDateTime: Date;
    modifiedDateTime: Date;
    name: string;
    primaryColour: string;
    secondaryColour: string;

    constructor() {
        super();
    }
}