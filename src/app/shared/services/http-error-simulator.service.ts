import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
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

  // Generic method to simulate any HTTP status code
  simulateStatusCode(statusCode: number, method: 'GET' | 'POST' = 'GET'): Observable<any> {
    const url = `${this.baseUrl}/${statusCode}`;

    if (method === 'POST') {
      return this.http.post(url, { test: 'data' });
    } else {
      return this.http.get(url);
    }
  }

  // Simulate with delay (in milliseconds)
  simulateStatusCodeWithDelay(
    statusCode: number,
    method: 'GET' | 'POST' = 'GET',
    delayMs: number = 1000
  ): Observable<any> {
    const url = `${this.baseUrl}/${statusCode}?sleep=${delayMs}`;

    if (method === 'POST') {
      return this.http.post(url, { test: 'data' });
    } else {
      return this.http.get(url);
    }
  }
}
