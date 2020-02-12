import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {State} from './state';
import {Player, Track, Task} from '../generated/model';
import {filter, find, first, map} from 'rxjs/operators';
import {StateService} from './state.service';

@Injectable({
  providedIn: 'root'
})
export class Store {

  constructor(private stateService: StateService) {}

  getPeople$(): Observable<Player[]> {
    return this.stateService.get$().pipe(
      map((state: State) => state.people)
    );
  }

  getPeople(): Player[] {
    return this.stateService.get().people;
  }

  getPersonById$(id: number): Observable<Player> {
    return this.stateService.get$().pipe(
      map((state: State) => state.teams),
      map( (teams: Player[]) => teams.find(t => t.id === id))
    );
  }

  getSharedData$(): Observable<any> {
    return this.stateService.get$().pipe(
      map((state: State) => state.sharedData)
    );
  }

  getSharedData(): any {
    return this.stateService.get().sharedData;
  }

  getTeams$(): Observable<Player[]> {
    return this.stateService.get$().pipe(
      map((state: State) => state.teams)
    );
  }

  getTeams(): Player[] {
    return this.stateService.get().teams;
  }

  getTasks$(): Observable<Task[]> {
    return this.stateService.get$().pipe(
      map((state: State) => state.tasks)
    );
  }

  getTasks() {
    return this.stateService.get().tasks;
  }

  getTracks$(): Observable<Track[]> {
    return this.stateService.get$().pipe(
      map((state: State) => state.tracks)
    );
  }

  getTracks() {
    return this.stateService.get().tracks;
  }
}
