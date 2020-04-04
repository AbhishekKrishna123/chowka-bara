import { IGameState } from "../interfaces/IGameState";
import { Move } from "../Move";
import { MoveStatus } from "../helpers/MoveStatus";
import { Player } from "../Player";
import { GameStatus } from "../helpers/GameStatus";
import { ObjectId } from "mongodb";

export class GameState implements IGameState {

    players: Player[];
    turn: number;
    moves: Move[];
    status: GameStatus;

    constructor(player: Player) {
        this.players = [player];
        this.turn = 0;
        this.moves = [];
        this.status = GameStatus.CREATED;
    }

    addPlayer(player: Player): void {
        if (this.players.length >= 4) {
            throw new Error("Can't add more than 4 players!");
        }

        this.players.push(player);

        // set board positions
        this.players[0].position = 0;
        if (this.players.length === 2) {
            this.players[1].position = 2;
        } else if (this.players.length >= 3) {
            for (let i: number = 1; i < this.players.length; i++) {
                this.players[i].position = i;
            }
        }
    }

    removePlayer(id: number): void {
        let prevLength: number = this.players.length;

        this.players = this.players.map(player => {
            if (player.id !== id) {
                return player;
            }
        });

        if (prevLength !== this.players.length) {
            throw new Error("Player not found!");
        }
    }

    nextTurn(): void {
        this.turn = (this.turn + 1) % this.players.length;
    }

    addMove(roll: number, player: number): number {
        this.moves.push(new Move(roll, player));
        return (this.moves.length - 1);
    }

    updateMove(moveIdx: number, pawnIdx: number): void {
        this.moves[moveIdx].pawn = pawnIdx;
        this.moves[moveIdx].status = MoveStatus.WAITING;
    }

    completeMove(moveIdx: number): void {
        this.moves[moveIdx].status = MoveStatus.COMPLETED;
    }

    cancelMove(moveIdx: number): void {
        this.moves[moveIdx].status = MoveStatus.CANCELLED;
    }

}