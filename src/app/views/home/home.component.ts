import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { TopicItemComponent } from './sub-components/topic-item/topic-item.component';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  imports: [TopicItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeComponent {
  public topics: any;

  constructor(private homeService: HomeService) {
    // reexportamos la señal del servicio para que la plantilla la consuma
    this.topics = this.homeService.topics;
  }

  handleToggleTopic(id: string): void {
    this.homeService.toggleTopic(id);
  }
}
