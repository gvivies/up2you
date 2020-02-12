import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Task} from '../generated/model';
import {environment} from '../../../environments/environment';
import {ApiRoutes} from '../routing/api-routes';
import {map} from 'rxjs/operators';
import {ApiDeserializer} from './api-deserializer';
import {CrudService} from './crud-service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskRepository {

  constructor(private crudService: CrudService, private httpClient: HttpClient) { }

  list$(): Observable<Task[]> {
    const apiUrl = environment.endpoint + ApiRoutes.URL_API_TASKS;
    const httpHeaders = {headers: this.crudService.getHttpHeaders()};

    const tasks = this.httpClient.get(apiUrl, httpHeaders).pipe(
      map((data: Task[]) => data.map(task => ApiDeserializer.toTask(task)))
    );
    return tasks;
  }

  update$(task: Task): Observable<Task> {
    const apiUrl = environment.endpoint + ApiRoutes.URL_API_TASK;
    const updated$ = this.crudService.update$(apiUrl, task).pipe(
      map(t => ApiDeserializer.toTask(t))
    );
    return updated$;
  }

  create$(task: Task): Observable<Task> {
    const apiUrl = environment.endpoint + ApiRoutes.URL_API_TASK;
    const created$ = this.crudService.create$(apiUrl, task).pipe(
      map(t => ApiDeserializer.toTask(t))
    );
    return created$;
  }

  delete$(task: Task): Observable<any> {
    const apiUrl = environment.endpoint + ApiRoutes.URL_API_TASK;
    return this.crudService.remove$(apiUrl, task);
  }
}
