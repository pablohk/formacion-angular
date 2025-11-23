import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormularioTwoBindingComponent } from './sub-components/formulario-two-binding/formulario-two-binding.component';
import { FormularioBuilderComponent } from './sub-components/formulario-builder/formulario-builder.component';

@Component({
  selector: 'app-formulario-simple',
  imports: [CommonModule, FormularioTwoBindingComponent, FormularioBuilderComponent],
  templateUrl: './formulario-simple.component.html',
  styleUrl: './formulario-simple.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class FormularioSimpleComponent {
  public activeTab: 'two' | 'builder' = 'two';

  setTab(tab: 'two' | 'builder') {
    this.activeTab = tab;
  }
}
