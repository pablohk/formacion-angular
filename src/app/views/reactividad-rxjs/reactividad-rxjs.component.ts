import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit, inject, DestroyRef, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, interval, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, filter, tap, debounceTime, takeWhile, switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-reactividad-rxjs',
  templateUrl: './reactividad-rxjs.component.html',
  styleUrls: ['./reactividad-rxjs.component.scss'],
  imports: [CommonModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ReactividadRxjsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  public clickCount = signal<number>(0);

  // Subject parael ejemplo de debounce
  eventos$ = new Subject<number>();
  eventosHistory$ = new BehaviorSubject<number[]>([0]);

  // Subjects para combineLatest example
  valor1$ = new BehaviorSubject<number>(10);
  valor2$ = new BehaviorSubject<number>(20);

  // Subject para controlar el switchMap
  seleccionado$ = new BehaviorSubject<'pares' | 'impares'>('pares');

  // Subject para guardar el historial de switchMap
   switchMapHistory$ = new BehaviorSubject<Array<{ tipo: string; numero: number }>>([]);

 
   // Genera un Observable que emite números cada 500ms, pero sólo emite los pares
  numeros$ = interval(500).pipe(
    map(n => n + 1),
    filter(n => n % 2 === 0),
    takeUntilDestroyed(this.destroyRef),
  );

    // Genera un Observable que emite números cada 800ms, les suma 1, filtra dependendo del tipo y los mapea a un objeto
  intervalInner$ = (tipo: string)=> interval(800).pipe(
        map(n => n + 1),
        filter(n => tipo === 'pares' ? n % 2 === 0 : n % 2 !== 0),
        map(n => ({ tipo, numero: n }))
      );

  // combineLatest: Observable que emite cuando cualquiera de los observables emite, con el último valor de cada uno
  combinado$ = combineLatest([
    this.valor1$,
    this.valor2$
  ]).pipe(
    map(([v1, v2]) => ({
      v1,
      v2,
      suma: v1 + v2,
      producto: v1 * v2
    })),
    takeUntilDestroyed(this.destroyRef)
  );


  // switchMap: Observable que cambia dinámicamente el observable interno según la selección
  switchMapExample$ = this.seleccionado$.pipe(
    switchMap((tipo) => {
      console.log('[switchMap] cambiando a:', tipo);
      // Observable interno. Se cancela cuando el externo recibe un nuevo valor y se vuelve a subsscribir
      return this.intervalInner$(tipo);
    }),
    takeUntilDestroyed(this.destroyRef)
  );

 

  ngOnInit(): void {
    this.startSubscriptionEventos();
    this.startSubscriptionSwitchMap();
  }

  // Suscribirse al observable que recoge los eventos del click debounce para guardar el valor en el histórico
  private startSubscriptionEventos() {
     this.eventos$.pipe(
      debounceTime(250),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((v: number) => {
      const current = this.eventosHistory$.getValue();
      this.eventosHistory$.next([...current, v]);
    });
  }
  
  // Suscribirse al observable del ejemplo switchMap para guardar el valor en el historial
  private startSubscriptionSwitchMap() {
    this.switchMapExample$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((result) => {
      const current = this.switchMapHistory$.getValue();
      this.switchMapHistory$.next([...current, result].slice(-8)); // últimos 8 elementos
    });
  }

  //Recoge el evento del click del ejemplo debounce y emite el nuevo valor
  simulateEvent(): void {
    const newCount = this.clickCount() + 1;
    this.clickCount.set(newCount);
    this.eventos$.next(newCount);
  }

  reset(): void {
    this.clickCount.set(0);
    this.eventosHistory$.next([0]);
  }

  // Métodos para actualizar valores en combineLatest
  incrementarValor1(): void {
    this.valor1$.next(this.valor1$.getValue() + 5);
  }

  decrementarValor1(): void {
    this.valor1$.next(Math.max(0, this.valor1$.getValue() - 5));
  }

  incrementarValor2(): void {
    this.valor2$.next(this.valor2$.getValue() + 5);
  }

  decrementarValor2(): void {
    this.valor2$.next(Math.max(0, this.valor2$.getValue() - 5));
  }

  // Cambiar entre pares e impares en switchMap
  cambiarTipo(tipo: 'pares' | 'impares'): void {
    this.seleccionado$.next(tipo);
    this.switchMapHistory$.next([]);
  }

}
