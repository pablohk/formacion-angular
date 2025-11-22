import { Component, ChangeDetectionStrategy, ViewEncapsulation, signal } from '@angular/core';
import { PadreA } from './sub-components/padre-a/padre-a.component';

@Component({
  selector: 'app-datos-padre-hijo',
  imports: [PadreA],
  templateUrl: './datos-padre-hijo.component.html',
  styleUrl: './datos-padre-hijo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DatosPadreHijoComponent {
  info = signal<string>('Escribe algo...');

  setInfo(value?: string): void {
    this.info.set(value || 'Escribe algo...');
  }
}

