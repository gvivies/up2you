import {Place, Player, Task, Track} from '../generated/model';

export class ApiDeserializer {

  static nonNull = x => x !== undefined && x !== null && x !== 'null';

  static toPlayer(jsonObj: any): Player {
    const player = new Player();
    player.id = jsonObj.id;
    player.name = jsonObj.name;
    player.position = jsonObj.position;
    player.picture = jsonObj.picture;
    player.type = jsonObj.type;
    return player;
  }

  static toTask(jsonObj: any): Task {
    const task = new Task();
    task.id = jsonObj.id;
    task.name = jsonObj.name;
    return task;
  }

  static toTrack(jsonObj: any): Track {
    const track = new Track();
    track.id = jsonObj.id;
    track.description = jsonObj.description;
    track.lastMoved = new Date(jsonObj.lastMoved);
    track.currentPosition = jsonObj.currentPosition;
    track.type = jsonObj.type;
    track.task = this.toTask(jsonObj.task);
    if (jsonObj.places) {
      track.places = jsonObj.places.map(p => this.toPlace(p));
    } else {
      track.places = [];
    }
    return track;
  }

  private static toPlace(jsonObj: any) {
    const place = new Place();
    place.id = jsonObj.id
    place.position = jsonObj.position;
    place.player = this.toPlayer(jsonObj.player);
    place.track = { id: jsonObj.track.id} as Track;
    return place;
  }
}
