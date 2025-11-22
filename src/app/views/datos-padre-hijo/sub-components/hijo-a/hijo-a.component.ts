import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { NietoA } from '../nieto-a/nieto-a.component';

@Component({
  selector: 'app-hijo-a',
  imports: [NietoA],
  templateUrl: './hijo-a.component.html',
  styleUrls: ['./hijo-a.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class HijoA {
  info = input<string>();
  changeOutput = output<string>();

  handleChange(value: string): void {
    this.changeOutput.emit(value);
  }
}
