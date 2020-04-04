import { IGameState } from "./IGameState";

export interface IGameRules {

    validateRoll(state: IGameState): void;
    validateMove(state: IGameState): void;
}