import { Component, ChangeDetectionStrategy, ViewEncapsulation, signal, inject } from '@angular/core';
import { PadreA } from './sub-components/padre-a/padre-a.component';
import { PadreB } from './sub-components/padre-b/padre-b.component';
import { DatosPadreHijoService } from './services/datos-padre-hijo.service';

@Component({
  selector: 'app-datos-padre-hijo',
  imports: [PadreA, PadreB],
  templateUrl: './datos-padre-hijo.component.html',
  styleUrl: './datos-padre-hijo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DatosPadreHijoComponent {
  private readonly padreHijoService = inject(DatosPadreHijoService);
  
  info = signal<string>('Escribe algo...');

  setInfoA(value: string): void {
    this.info.set(value);
  }
  
  setInfoB(value?: string): void {
    this.info.set(value || 'Escribe algo...');
  }
}

