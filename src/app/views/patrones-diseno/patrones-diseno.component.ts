import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patrones-diseno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patrones-diseno.component.html',
  styleUrl: './patrones-diseno.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PatronesDisenoComponent {
  public ejemploTexto = '';

  clearEjemplo(): void {
    this.ejemploTexto = '';
  }
}
