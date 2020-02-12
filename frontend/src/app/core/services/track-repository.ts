import { Injectable } from '@angular/core';
import {CrudService} from './crud-service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task, Track} from '../generated/model';
import {environment} from '../../../environments/environment';
import {ApiRoutes} from '../routing/api-routes';
import {map, tap} from 'rxjs/operators';
import {ApiDeserializer} from './api-deserializer';

@Injectable({
  providedIn: 'root'
})
export class TrackRepository {

  constructor(private crudService: CrudService) { }

  list$(): Observable<Track[]> {
    const apiUrl = environment.endpoint + ApiRoutes.URL_API_TRACKS;
    const tracks = this.crudService.list$(apiUrl).pipe(
      map((data: Track[]) => data.map(track => ApiDeserializer.toTrack(track)))
    );
    return tracks;
  }

  update$(track: Track): Observable<Track> {
    const apiUrl = environment.endpoint + ApiRoutes.URL_API_TRACK;
    const updated$ = this.crudService.update$(apiUrl, track).pipe(
      map(t => ApiDeserializer.toTrack(t))
    );
    return updated$;
  }

  create$(track: Track): Observable<Track> {
    const apiUrl = environment.endpoint + ApiRoutes.URL_API_TRACK;
    const created$ = this.crudService.create$(apiUrl, track).pipe(
      map(t => ApiDeserializer.toTrack(t))
    );
    return created$;
  }

  delete$(track: Track): Observable<any> {
    const apiUrl = environment.endpoint + ApiRoutes.URL_API_TRACK;
    return this.crudService.remove$(apiUrl, track);
  }
}
