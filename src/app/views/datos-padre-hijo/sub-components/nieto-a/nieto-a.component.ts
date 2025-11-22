import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-nieto-a',
  imports: [],
  templateUrl: './nieto-a.component.html',
  styleUrls: ['./nieto-a.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class NietoA { 
  info= input<string>();
}
