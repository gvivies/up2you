import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Place, Player, Task, Track} from '../../core/generated/model';
import {Store} from '../../core/state-management/store.service';
import {Dispatcher} from '../../core/state-management/dispatcher.service';
import {Operation} from '../../core/state-management/operation';
import {Action} from '../../core/state-management/action';
import {FormGroup} from '@angular/forms';
import {PlayerService} from '../../shared/services/player.service';
import {NotifierService} from '../../shared/services/notifier-service';
import {TaskService} from '../../shared/services/task.service';
import {TrackService} from '../../shared/services/track.service';

@Injectable({
  providedIn: 'root'
})
export class AdminFacadeService {

  constructor(private globalStore: Store,
              private dispatcher: Dispatcher,
              private notifierService: NotifierService,
              private playerService: PlayerService,
              private taskService: TaskService,
              private trackService: TrackService) { }

  getPeopleList$(): Observable<Player[]> {
    return this.globalStore.getPeople$();
  }

  getPersonById$(id: number): Observable<Player> {
    return this.globalStore.getPersonById$(id);
  }

  getTasksList$(): Observable<Task[]> {
    return this.globalStore.getTasks$();
  }

  getTracksList$(): Observable<Track[]> {
    return this.globalStore.getTracks$();
  }

  getTeamsList$(): Observable<Player[]> {
    return this.globalStore.getTeams$();
  }

  getSharedData$() {
    return this.globalStore.getSharedData$();
  }

  setSharedData(sharedData: any) {
    this.dispatcher.dispatch({ operation: Operation.SET_SHARED_DATA, data: sharedData } as Action );
  }

  resetSharedData() {
    this.dispatcher.dispatch({ operation: Operation.SET_SHARED_DATA, data: undefined } as Action );
  }

  savePlayer(formGroup: FormGroup): Observable<Player> {
    const player = this.playerService.getPlayerFromFormGroup(formGroup);
    const playerSave$ = (player.id) ? this.playerService.update$(player) : this.playerService.create$(player);
    return playerSave$;
  }

  removePlayer(player: Player): void {
    this.playerService.delete$(player).subscribe(() => {
      this.notifierService.notifyInformation(`The player ${player.name} has been deleted.`);
    }, (err) => this.notifierService.notifyError(err.message));
  }

  saveTask(formGroup: FormGroup): Observable<Task> {
    const task = this.taskService.getTaskFromFormGroup(formGroup);
    const taskSave$ = (task.id) ? this.taskService.update$(task) : this.taskService.create$(task);
    return taskSave$;
  }

  removeTask(task: Task): void {
    this.taskService.delete$(task).subscribe(() => {
      this.notifierService.notifyInformation(`The task ${task.name} has been deleted.`);
    }, (err) => this.notifierService.notifyError(err.message));
  }

  saveTrack(formGroup: FormGroup, places: Place[]) {
    const track = this.trackService.getTrackFromFormGroup(formGroup);
    track.places = places;
    const trackSave$ = (track.id) ? this.trackService.update$(track) : this.trackService.create$(track);
    return trackSave$;
  }

  removePlaceFromTrack(place: Place) {
    const track: Track = this.globalStore.getSharedData();
    this.trackService.removePlace(track, place);
  }

  movePlaceDown(place: Place) {
    const track: Track = this.globalStore.getSharedData();
    this.trackService.movePlaceDown(track, place);
  }

  movePlaceUp(place: Place) {
    const track: Track = this.globalStore.getSharedData();
    this.trackService.movePlaceUp(track, place);
  }

  addPlaceToTrack(player: Player) {
    const track: Track = this.globalStore.getSharedData();
    this.trackService.addPlaceToTheEnd(track, player);
  }

  getSharedData() {
    return this.globalStore.getSharedData();
  }
}
