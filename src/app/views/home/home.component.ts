import { Component, ChangeDetectionStrategy, ViewEncapsulation, signal } from '@angular/core';
import { TopicItemComponent } from './sub-components/topic-item/topic-item.component';
import { COURSE_TOPICS, ITopic } from './home.models';


@Component({
  selector: 'app-home',
  imports: [TopicItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeComponent {
  public topics = signal<ITopic[]>(COURSE_TOPICS);

  toggleTopic(id: string): void {
    this.topics.update(topics => {
      return topics.map(topic => 
        topic.id === id 
          ? { ...topic, completed: !topic.completed }
          : topic
      );
    });
  }
}
