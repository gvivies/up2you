import { Injectable } from '@angular/core';
import {CrudService} from './crud-service';
import {Player} from '../generated/model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ApiRoutes} from '../routing/api-routes';
import {ApiDeserializer} from './api-deserializer';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerRepository {

  constructor(private crudService: CrudService) {
  }

  listPeople$(): Observable<Player[]> {
    const apiUrl = environment.endpoint + ApiRoutes.URL_API_PLAYERS;
    const players = this.crudService.list$(apiUrl).pipe(
      map((data: Player[]) => data.map(player => ApiDeserializer.toPlayer(player)))
    );
    return players;
  }

  listTeams$(): Observable<Player[]> {
    const apiUrl = environment.endpoint + ApiRoutes.URL_API_TEAMS;
    const teams = this.crudService.list$(apiUrl).pipe(
      map((data: Player[]) => data.map(player => ApiDeserializer.toPlayer(player)))
    );
    return teams;
  }

  update$(player: Player): Observable<Player> {
    const apiUrl = environment.endpoint + ApiRoutes.URL_API_PLAYER;
    const updated$ = this.crudService.update$(apiUrl, player).pipe(
      map(p => ApiDeserializer.toPlayer(p))
    );
    return updated$;
  }

  create$(player: Player): Observable<Player> {
    const apiUrl = environment.endpoint + ApiRoutes.URL_API_PLAYER;
    const created$ = this.crudService.create$(apiUrl, player).pipe(
      map(p => ApiDeserializer.toPlayer(p))
    );
    return created$;
  }

  delete$(player: Player): Observable<any> {
    const apiUrl = environment.endpoint + ApiRoutes.URL_API_PLAYER;
    return this.crudService.remove$(apiUrl, player);
  }
}
