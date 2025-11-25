import { Component, OnInit, inject, DestroyRef, ViewEncapsulation, ChangeDetectionStrategy, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { tap, finalize, catchError, take } from 'rxjs/operators';
import { of } from 'rxjs';

interface ApiResponse {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
  [key: string]: any;
}

interface RequestLog {
  timestamp: Date;
  method: string;
  url: string;
  status: string;
  data?: ApiResponse;
  error?: string;
}

@Component({
  selector: 'app-peticiones-api',
  templateUrl: './peticiones-api.component.html',
  styleUrls: ['./peticiones-api.component.scss'],
  imports: [CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeticionesApiComponent implements OnInit {
  private readonly httpClient = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  // Estados
  loading$ = new BehaviorSubject<boolean>(false);
  data$ = new BehaviorSubject<ApiResponse | null>(null);
  requestLogs$ = new BehaviorSubject<RequestLog[]>([]);
  error$ = new BehaviorSubject<string>('');

  // Parámetros
  postId: number = 1;
  apiUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  ngOnInit(): void {
    // Ejemplo: cargar un post al iniciar
    this.fetchPost(1);
  }

  /**
   * Realiza una petición GET para obtener un post por ID
   */
  fetchPost(id: number): void {
    this.loading$.next(true);
    this.error$.next('');
    const url = `${this.apiUrl}/${id}`;

    this.httpClient.get<ApiResponse>(url).pipe(
      tap(data => {
        console.log('[GET] Datos recibidos:', data);
        this.data$.next(data);
        this.addLog('GET', url, 'success', data);
      }),
      catchError(err => {
        console.error('[GET] Error:', err);
        this.error$.next(`Error: ${err.message}`);
        this.addLog('GET', url, 'error', undefined, err.message);
        return of(null);
      }),
      finalize(() => this.loading$.next(false)),
      take(1)
    ).subscribe();
  }

  /**
   * Realiza una petición GET para obtener todos los posts
   */
  fetchAllPosts(): void {
    this.loading$.next(true);
    this.error$.next('');
    const options = {
        headers: { 'person-header': 'atm' }
    };
    this.httpClient.request<ApiResponse[]>('GET', this.apiUrl,options).pipe(
      tap(data => {
        console.log('[GET ALL] Datos recibidos:', data.length, 'posts');
        this.data$.next({ count: data.length, posts: data });
        this.addLog('GET', this.apiUrl, 'success', { count: data.length });
      }),
      catchError(err => {
        console.error('[GET ALL] Error:', err);
        this.error$.next(`Error: ${err.message}`);
        this.addLog('GET', this.apiUrl, 'error', undefined, err.message);
        return of(null);
      }),
      finalize(() => this.loading$.next(false)),
      take(1)
    ).subscribe();
  }

  /**
   * Realiza una petición POST para crear un nuevo post
   */
  createPost(): void {
    this.loading$.next(true);
    this.error$.next('');

    const newPost = {
      title: 'Nuevo Post desde Angular',
      body: 'Este es un ejemplo de petición POST con httpClient',
      userId: 1
    };

    this.httpClient.post<ApiResponse>(this.apiUrl, newPost).pipe(
      tap(data => {
        console.log('[POST] Post creado:', data);
        this.data$.next(data);
        this.addLog('POST', this.apiUrl, 'success', data);
      }),
      catchError(err => {
        console.error('[POST] Error:', err);
        this.error$.next(`Error: ${err.message}`);
        this.addLog('POST', this.apiUrl, 'error', undefined, err.message);
        return of(null);
      }),
      finalize(() => this.loading$.next(false)),
      take(1)
    ).subscribe();
  }

  /**
   * Realiza una petición PUT para actualizar un post
   */
  updatePost(id: number): void {
    this.loading$.next(true);
    this.error$.next('');

    const url = `${this.apiUrl}/${id}`;
    const updatedPost = {
      id,
      title: 'Post actualizado desde Angular',
      body: 'Contenido modificado con PUT',
      userId: 1
    };

    this.httpClient.put<ApiResponse>(url, updatedPost).pipe(
      tap(data => {
        console.log('[PUT] Post actualizado:', data);
        this.data$.next(data);
        this.addLog('PUT', url, 'success', data);
      }),
      catchError(err => {
        console.error('[PUT] Error:', err);
        this.error$.next(`Error: ${err.message}`);
        this.addLog('PUT', url, 'error', undefined, err.message);
        return of(null);
      }),
      finalize(() => this.loading$.next(false)),
        take(1)
    ).subscribe();
  }

  /**
   * Realiza una petición DELETE para eliminar un post
   */
  deletePost(id: number): void {
    this.loading$.next(true);
    this.error$.next('');

    const url = `${this.apiUrl}/${id}`;

    this.httpClient.delete(url).pipe(
      tap(() => {
        console.log('[DELETE] Post eliminado:', id);
        this.data$.next({ deleted: true, id });
        this.addLog('DELETE', url, 'success');
      }),
      catchError(err => {
        console.error('[DELETE] Error:', err);
        this.error$.next(`Error: ${err.message}`);
        this.addLog('DELETE', url, 'error', undefined, err.message);
        return of(null);
      }),
      finalize(() => this.loading$.next(false)),
     take(1)
    ).subscribe();
  }

  /**
   * Añade un registro del log de peticiones
   */
  private addLog(method: string, url: string, status: string, data?: ApiResponse, error?: string): void {
    const log: RequestLog = {
      timestamp: new Date(),
      method,
      url,
      status,
      data,
      error
    };

    const currentLogs = this.requestLogs$.getValue();
    this.requestLogs$.next([...currentLogs, log].slice(-10)); // Mantén los últimos 10 logs
  }

  /**
   * Limpia los logs
   */
  clearLogs(): void {
    this.requestLogs$.next([]);
  }

  /**
   * Obtiene la clase CSS según el estado
   */
  getStatusClass(status: string): string {
    return status === 'success' ? 'status-success' : 'status-error';
  }
}
