import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { HijoB } from "../hijo-b/hijo-b.component";

@Component({
  selector: 'app-padre-b',
  imports: [HijoB],
  templateUrl: './padre-b.component.html',
  styleUrls: ['./padre-b.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PadreB { 
}
