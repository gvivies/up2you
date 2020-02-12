import {Player, Task, Track} from '../generated/model';

export class State {
  people: Player[] = [];
  tasks: Task[] = [];
  tracks: Track[] = [];
  teams: Player[] = [];
  sharedData: any;
}
