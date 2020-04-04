import { ObjectId } from "mongodb";

/**
 * This class is a base model from which
 * other models are derived
 * from MongoDB
 */
export abstract class BaseModel {

    abstract _id: ObjectId;
    abstract createdDateTime: Date;
    abstract modifiedDateTime: Date;

    constructor() {
        this.init();
    }

    init() {
        this._id = new ObjectId();
        this.createdDateTime = new Date();
    }

    // getObject(this: any): any {
    //     var obj: any = {};

    //     Object.getOwnPropertyNames(this).forEach(prop =>
    //         {
    //             obj[prop] = this[prop];
    //             console.log(prop);
    //         }
    //     );

    //     return obj;
    // }

    // setObject(this: any, obj: any): any {
    //     Object.getOwnPropertyNames(obj).forEach(prop =>
    //         {
    //             this[prop] = obj[prop];
    //         }
    //     );
    // }
}

