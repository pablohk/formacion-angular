import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-carga-diferida',
  imports: [],
  templateUrl: './carga-diferida.component.html',
  styleUrl: './carga-diferida.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CargaDiferidaComponent {
  readonly codeExampleLazy = `
  {
      path: 'carga-diferida',
      loadComponent: () =>
      import('./views/carga-diferida/carga-diferida.component')
      .then((m) => m.CargaDiferidaComponent),
  },`;

  readonly codeExampleDefer = `
    @defer {
      <large-component />
    } @loading {
      <img alt="loading..." src="loading.gif" />
    } @placeholder {
      <p>Placeholder content</p>
    }`;
}
