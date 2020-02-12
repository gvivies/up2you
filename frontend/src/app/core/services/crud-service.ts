import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  getHttpHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Requested-With', 'XMLHttpRequest');
    return headers;
  }

  list$(url: string): Observable<any> {
    return this.http.get(
      url,
      { headers: this.getHttpHeaders() }
    );
  }

  update$(url: string, item: any): Observable<any> {
    return this
      .http
      .put(url , item, {
        headers: this.getHttpHeaders()
      });
  }

  create$(url: string, item: any): Observable<any> {
    return this
      .http
      .post(url, item, {
        headers: this.getHttpHeaders()
      });
  }

  remove$(url: string, item: any): Observable<any> {
    return this
      .http
      .delete(url + '/' + item.id, {
        headers: this.getHttpHeaders()
      });
  }

  get$(url: string, item: any): Observable<any> {
    return this.http.get(
      url,
      { headers: this.getHttpHeaders(),
        params: { id: item.id } },
    );
  }

  getById$(url: string, id: number): Observable<any> {
    return this.http.get(
      url + '/' + id,
      {
        headers: this.getHttpHeaders()
      },
    );
  }

}
