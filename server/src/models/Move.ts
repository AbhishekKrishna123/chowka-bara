import { MoveStatus } from "./helpers/MoveStatus";

export class Move {
    roll: number;   // dice roll one of 1,2,3,4 or 8
    player: number; // player index
    pawn: number;   // pawn index
    status: MoveStatus;

    constructor(roll: number, player: number) {
        this.roll = roll;
        this.player = player;
        this.pawn = null;
        this.status = MoveStatus.PENDING;
    }
}