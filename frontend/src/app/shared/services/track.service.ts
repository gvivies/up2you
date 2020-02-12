import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Place, Player, Track} from '../../core/generated/model';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Operation} from '../../core/state-management/operation';
import {Action} from '../../core/state-management/action';
import {TrackRepository} from '../../core/services/track-repository';
import {Store} from '../../core/state-management/store.service';
import {Dispatcher} from '../../core/state-management/dispatcher.service';
import {MoveDirection} from '../../core/model/moveDirection';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private trackRepository: TrackRepository,
              private store: Store,
              private dispatcher: Dispatcher) {
  }

  buildFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      description: new FormControl(''),
      currentPosition: new FormControl(''),
      task: new FormControl(''),
      type: new FormControl('')
    });
  }

  getTrackFromFormGroup(formGroup: FormGroup) {
    const track = new Track();
    track.id = formGroup.controls.id.value;
    track.description = formGroup.controls.description.value;
    track.currentPosition = formGroup.controls.currentPosition.value;
    track.type = formGroup.controls.type.value;
    track.task = formGroup.controls.task.value;
    return track;
  }

  update$(track: Track): Observable<Track> {
    return this.trackRepository.update$(track).pipe(
      tap(t => this.updateInState(t))
    );
  }

  create$(track: Track): Observable<Track> {
    return this.trackRepository.create$(track).pipe(
      tap(t => this.insertIntoState(t))
    );
  }

  delete$(track: Track): Observable<any> {
    return this.trackRepository.delete$(track).pipe(
      tap(t => this.removeFromState(t))
    );
  }

  private insertIntoState(track: Track) {
    this.modifyState(track, true);
  }

  private updateInState(track: Track) {
    this.modifyState(track, false);
  }

  private modifyState(track: Track, isNew: boolean) {
    const tracks = this.store.getTracks();
    if (isNew) {
      tracks.push(track);
    } else {
      const indexToUpdate = tracks.findIndex(t => t.id === track.id);
      tracks[indexToUpdate] = track;
    }
    this.dispatcher.dispatch({ operation: Operation.SET_TASKS, data: tracks} as Action);
  }

  private removeFromState(track: Track) {
    const tracks = this.store.getTracks();
    const indexToRemove = tracks.findIndex(t => t.id === track.id);
    tracks.splice(indexToRemove, 1);
    this.dispatcher.dispatch({ operation: Operation.SET_TASKS, data: tracks} as Action);
  }

  removePlace(track: Track, place: Place): void {
    const indexToRemove = track.places.findIndex(p => p.id === place.id);
    track.places.splice(indexToRemove, 1);
    track.places = this.renumberPlaces(track.places);
    this.dispatcher.dispatch({ operation: Operation.SET_SHARED_DATA, data: track });
  }

  movePlaceDown(track: Track, place: Place): void {
    this.movePlace(track, place, MoveDirection.DOWN);
  }

  movePlaceUp(track: Track, place: Place) {
    this.movePlace(track, place, MoveDirection.UP);
  }

  addPlaceToTheEnd(track: Track, player: Player) {
    const place = new Place();
    place.player = player;
    place.position = track.places.length + 1;
    place.track = { id: track.id } as Track;
    track.places.push(place);
    this.dispatcher.dispatch({ operation: Operation.SET_SHARED_DATA, data: track });
  }

  private movePlace(track: Track, place: Place, direction: MoveDirection) {
    const positionOfMovedPlace = place.position;
    const placesToRenumber = track.places;
    if (direction === MoveDirection.UP) {
      placesToRenumber.forEach(p => p.position = this.movedUpPositionIfNeeded(p.position, positionOfMovedPlace));
    } else {
      placesToRenumber.forEach(p => p.position = this.movedDownPositionIfNeeded(p.position, positionOfMovedPlace));
    }
    placesToRenumber.sort((a, b) => a.position > b.position ? 1 : -1);
    track.places = placesToRenumber;
    this.dispatcher.dispatch({ operation: Operation.SET_SHARED_DATA, data: track });
  }

  private movedDownPositionIfNeeded(positionToRenumber: number, movedDownPos: number): number {
    if (positionToRenumber === movedDownPos) {
      return positionToRenumber - 1;
    } else if (positionToRenumber === movedDownPos - 1) {
      return positionToRenumber + 1;
    }
    return positionToRenumber;
  }

  private movedUpPositionIfNeeded(positionToRenumber: number, movedUpPos: number) {
    if (positionToRenumber === movedUpPos) {
      return positionToRenumber + 1;
    } else if (positionToRenumber === movedUpPos + 1) {
      return positionToRenumber - 1;
    }
    return positionToRenumber;
  }

  private renumberPlaces(places: Place[]): Place[] {
    let count = 1;
    places.forEach(p => p.position = count++);
    return places;
  }

}
