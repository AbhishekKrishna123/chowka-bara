export enum MoveStatus {
    PENDING,    // roll is complete, but pawn has not been moved
    WAITING,    // roll completed and piece moved, but turn is not finished (this move could be completed or cancelled)
    COMPLETED,  // roll completed and piece moved, turn is completed  successfully
    CANCELLED   // the piece move is cancelled and turn is aborted
}