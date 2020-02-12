// Generated using typescript-generator version 2.0.400 on 2019-12-14 15:58:34.

export class MoveCommand {
    track: Track;
    direction: Direction;
    nbRanks: number;
}

export class Place {
    id: number;
    player: Player;
    position: number;
    track: Track;
}

export class Player {
    id: number;
    name: string;
    picture: string;
    position: number;
    type: PlayerType;
}

export class Task {
    id: number;
    name: string;
}

export class Track {
    id: number;
    type: PlayerType;
    lastMoved: Date;
    task: Task;
    places: Place[];
    currentPosition: number;
    description: string;
}

export const enum Direction {
    FORWARD = 'FORWARD',
    BACK = 'BACK',
}

export const enum PlayerType {
    PERSON = 'PERSON',
    TEAM = 'TEAM',
}
