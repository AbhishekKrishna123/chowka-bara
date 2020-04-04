import { IGameState } from "../interfaces/IGameState";
import { IGameRules } from "../interfaces/IGameRules";
import { Move } from "../Move";
import { Player } from "../Player";

export class GameRules implements IGameRules {

    MAX_DISTANCE: number;
    INNER_PATH_START_INDEX: number;
    SAFE_SQUARES: number[];
    NUM_PAWNS = 4;

    constructor() {
        this.MAX_DISTANCE = 24;
        this.INNER_PATH_START_INDEX = 16;
        this.SAFE_SQUARES = [0,4,8,12];
    }

    /**
     * get the remaining distances to finish
     * of each pawn of the current player
     * @param state game state
     */
    getRemainingDistances(state: IGameState): number[] {

        let remainingDistances: number[] = [];

        for (let i:number = 0; i < this.NUM_PAWNS; i++) {
            let remDist: number = 0;
            let pawnPos: number = state.players[state.turn].pawns[i];

            // take care of kill not yet done
            if (state.players[state.turn].hasKilled === true) {
                remDist = this.MAX_DISTANCE - pawnPos;
            } else {
                remDist = this.INNER_PATH_START_INDEX - pawnPos;
            }

            remainingDistances.push(remDist);
        }

        // todo: take care of pair blocking
        return remainingDistances;
    }

    /**
     * Checks whether the latest roll has any valid moves
     * @param state game state
     */
    validateRoll(state: IGameState): void {

        /* Roll can be invalid if triple 4s or 8s are rolled */
        let curMove: Move = state.moves[state.moves.length-1];
        // compare with last 2 moves
        if (curMove.roll === 4 || curMove.roll === 8) {

            let prev1: Move = state.moves[state.moves.length-2];
            let prev2: Move = state.moves[state.moves.length-3];

            if (
                curMove.roll === prev1.roll && curMove.roll === prev2.roll &&
                curMove.player === prev1.player && curMove.player === prev2.player
            ) {
                throw new Error(`Three consecutive rolls of ${curMove.roll} is not allowed!`);
            }
        }

        // roll can be invalid if all the pending moves cannot be made
        let remainingDistances: number[] = this.getRemainingDistances(state);

        let currentRoll: number = state.moves[state.moves.length-1].roll;

        let isValid: boolean = false;
        for (let i: number = 0; i < remainingDistances.length; i++) {
            if (currentRoll <= remainingDistances[i]) {
                isValid = true;
            }
        }

        if (!isValid) {
            throw new Error("Invalid roll as no moves can be made!");
        }
    }

    /**
     * Check whether the latest move is a valid move
     * @param state game state
     */
    validateMove(state: IGameState): void {

        let curMove: Move = state.moves[state.moves.length-1];

        let remainingDistances: number[] = this.getRemainingDistances(state);

        // the selected pawn should have distance to move forward
        if (remainingDistances[curMove.pawn] < curMove.roll) {
            throw new Error("Invalid Move! No space to move forward.");
        }

        // in outer ring, same player pawn cannot be in the same square
        let curPlayer: Player = state.players[state.turn];
        for (let i: number=0; i<this.NUM_PAWNS; i++) {
            // don't compare the moved pawn with itself
            if (curMove.pawn != i) {
                // check if pawns are on the same square
                if (curPlayer.pawns[i] === curMove.pawn) {
                    let pos: number = curMove.pawn;

                    // the position is outside and is not a safe square
                    if (
                        pos < this.INNER_PATH_START_INDEX &&
                        this.SAFE_SQUARES.indexOf(pos) !== -1
                    ) {
                        throw new Error("Invalid Move! Two pieces not allowed in the same position.");
                    }
                }
            }
        }

    }



}