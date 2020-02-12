import { Injectable } from '@angular/core';
import {Dispatcher} from '../state-management/dispatcher.service';
import {Operation} from '../state-management/operation';
import {Action} from '../state-management/action';
import {PlayerService} from '../../shared/services/player.service';
import {TaskRepository} from './task-repository';
import {TrackRepository} from './track-repository';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private playerService: PlayerService,
              private taskDataService: TaskRepository,
              private trackDataService: TrackRepository,
              private dispatcher: Dispatcher) { }

  initPeople(): void {
    this.playerService.loadPeople();
  }

  initTasks(): void {
    this.taskDataService.list$().subscribe(
      (tasks) => this.dispatcher
        .dispatch({ operation: Operation.SET_TASKS, data: tasks } as Action ));
  }

  initTracks(): void {
    this.trackDataService.list$().subscribe(
      (tracks) => this.dispatcher
        .dispatch({ operation: Operation.SET_TRACKS, data: tracks } as Action ));
  }

  initTeams() {
    this.playerService.loadTeams();
  }
}
