import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorSimulatorService {
  private baseUrl = 'https://httpbin.org/status';

  constructor(private http: HttpClient) {}

  // GET Requests
  getSuccess(): Observable<any> {
    return this.http.get(`${this.baseUrl}/200`);
  }

  getError400(): Observable<any> {
    return this.http.get(`${this.baseUrl}/400`);
  }

  getError401(): Observable<any> {
    return this.http.get(`${this.baseUrl}/401`);
  }

  getError403(): Observable<any> {
    return this.http.get(`${this.baseUrl}/403`);
  }

  getError404(): Observable<any> {
    return this.http.get(`${this.baseUrl}/404`);
  }

  getError500(): Observable<any> {
    return this.http.get(`${this.baseUrl}/500`);
  }

  // POST Requests
  postSuccess(): Observable<any> {
    return this.http.post(`${this.baseUrl}/200`, { test: 'data' });
  }

  postError400(): Observable<any> {
    return this.http.post(`${this.baseUrl}/400`, { test: 'data' });
  }

  postError401(): Observable<any> {
    return this.http.post(`${this.baseUrl}/401`, { test: 'data' });
  }

  postError403(): Observable<any> {
    return this.http.post(`${this.baseUrl}/403`, { test: 'data' });
  }

  postError404(): Observable<any> {
    return this.http.post(`${this.baseUrl}/404`, { test: 'data' });
  }

  postError500(): Observable<any> {
    return this.http.post(`${this.baseUrl}/500`, { test: 'data' });
  }

  getError400RXJS(flag=false): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/400`)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => throwError(() => flag ? 'cusmonError' : error))
      );
  }
}
