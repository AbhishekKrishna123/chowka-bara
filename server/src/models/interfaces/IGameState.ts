import { MoveStatus } from "../helpers/MoveStatus";
import { Move } from "../Move";
import { Player } from "../Player";

export interface IGameState {
    players: Player[];  // array of players (max 4)
    turn: number;       // index of current player
    moves: Move[];

    addPlayer(player: Player): void;
    removePlayer(id: number): void;

    nextTurn(): void; // update turn to the next player
    addMove(roll: number, player: number): number;
    updateMove(moveIdx: number, pawnIdx: number, moveStatus: MoveStatus): void;
    completeMove(moveIdx: number): void;
    cancelMove(moveIdx: number): void;
}