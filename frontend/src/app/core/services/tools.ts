import {Place, Player, Task, Track} from '../generated/model';

export class Tools {

  static cloneTrack(track: Track): Track {
    const clone = new Track();
    clone.id = track.id;
    clone.description = track.description;
    clone.type = track.type;
    clone.currentPosition = track.currentPosition;
    clone.lastMoved = track.lastMoved;
    clone.task = Tools.cloneTask(track.task);
    clone.places = track.places.map(p => Tools.clonePlace(p));
    return clone;
  }

  static clonePlace(place: Place): Place {
    const clone = new Place();
    clone.id = place.id;
    clone.position = place.position;
    clone.player = Tools.clonePlayer(place.player);
    // clone.track = { id: clone.track.id } as Track;
    return clone;
  }

  static clonePlayer(player: Player): Player {
    const clone = new Player();
    clone.id = player.id;
    clone.position = player.position;
    clone.picture = player.picture;
    clone.type = player.type;
    clone.name = player.name;
    return clone;
  }

  private static cloneTask(task: Task) {
    const clone = new Task();
    clone.id = task.id;
    clone.name = task.name;
    return clone;
  }
}
