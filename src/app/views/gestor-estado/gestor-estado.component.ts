import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-gestor-estado',
  imports: [CommonModule],
  templateUrl: './gestor-estado.component.html',
  styleUrls: ['./gestor-estado.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})  

export class GestorEstadoComponent {}
