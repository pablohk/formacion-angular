import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { HijoA } from '../hijo-a/hijo-a.component';

@Component({
  selector: 'app-padre-a',
  imports: [HijoA],
  templateUrl: './padre-a.component.html',
  styleUrls: ['./padre-a.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PadreA {
  info = input<string>();
  changeOutput = output<string>();

  handleChange(value: string): void {
    this.changeOutput.emit(value);
  }
}
