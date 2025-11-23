import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TooltipPipe } from '../../shared/pipes/tooltip.pipe';

@Component({
  selector: 'app-pipes-examples',
  imports: [CommonModule, TooltipPipe],
  templateUrl: './pipes-examples.component.html',
  styleUrls: ['./pipes-examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.ShadowDom
})
export class PipesExamplesComponent { }
