import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { DatosPadreHijoService } from '../../services/datos-padre-hijo.service';

@Component({
  selector: 'app-nieto-b',
  imports: [],
  templateUrl: './nieto-b.component.html',
  styleUrls: ['./nieto-b.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class NietoB {
  readonly padreHijoService = inject(DatosPadreHijoService);
  infoB = this.padreHijoService.getInfoB();
  handleChangeB(value?: string): void {
    this.padreHijoService.setInfoB(value || 'Escribe de nuevo...');
  }
}
