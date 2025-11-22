import { Component, input, output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topic-item',
  imports: [CommonModule],
  templateUrl: './topic-item.component.html',
  styleUrl: './topic-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TopicItemComponent {
  title = input.required<string>();
  subtitle = input<string>();
  subItems = input<string[]>();
  completed = input<boolean>(false);
  toggle = output<void>();

  onToggle(): void {
    this.toggle.emit();
  }
}

