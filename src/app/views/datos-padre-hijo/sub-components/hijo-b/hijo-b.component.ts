import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NietoB } from "../nieto-b/nieto-b.component";

@Component({
  selector: 'app-hijo-b',
  imports: [NietoB],
  templateUrl: './hijo-b.component.html',
  styleUrls: ['./hijo-b.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HijoB { 
}
