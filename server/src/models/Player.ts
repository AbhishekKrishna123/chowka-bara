import { BaseModel } from "./BaseModel";
import { ObjectId } from "mongodb";

export class Player extends BaseModel {

    _id: ObjectId;

    createdDateTime: Date;
    modifiedDateTime: Date;
    id: number;

    /**
     * position of the player on the board
     * In 2 or 3 player game, position is different from player array index
     *
     * Used for calculating board logic
     */
    position: number;
    pawns: number[];
    hasKilled: boolean;

    constructor() {
        super();
        this.position = 0;   // set as 0
        this.pawns = [0, 0, 0, 0];
        this.hasKilled = false;
    }
}
