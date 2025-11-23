import { Injectable, signal, WritableSignal, Signal } from '@angular/core';
import { ITopic, COURSE_TOPICS } from './home.models';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _topics: WritableSignal<ITopic[]> = signal<ITopic[]>(COURSE_TOPICS);

  // getter público de sólo lectura para que los consumidores no puedan mutar directamente
  public get topics(): Signal<ITopic[]> {
    return this._topics;
  }

  toggleTopic(id: string): void {
    this._topics.update((topics) =>
      topics.map((topic) =>
        topic.id === id ? { ...topic, completed: !topic.completed } : topic
      )
    );
  }

  // opcional: obtener topic por id
  getTopic(id: string): ITopic | undefined {
    return this._topics().find((t) => t.id === id);
  }
}
