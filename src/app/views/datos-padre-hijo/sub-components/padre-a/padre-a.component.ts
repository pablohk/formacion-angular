import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { HijoA } from "../hijo-a/hijo-a.component";

@Component({
  selector: 'app-padre-a',
  imports: [HijoA],
  templateUrl: './padre-a.component.html',
  styleUrls: ['./padre-a.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PadreA { 
  info= input<string>();
}
