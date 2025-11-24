import { computed, Signal, signal, WritableSignal } from '@angular/core';

export abstract class GenericStoreService<T> {
  protected readonly _state!: WritableSignal<T>;

  constructor(initialState: T) {
    this._state = signal(initialState);
  }
  protected getState(): T {
    return this._state();
  }
  protected select<K>(selector: (state: T) => K): Signal<K> {
    return computed(() => {
      return selector(this._state());
    });
  }

  protected setState(updater: (state: T) => T): void {
    const currentState = this._state();
    if (!currentState) {
      return;
    }

    const incomingState = updater(currentState);
    const currentStateParse = JSON.stringify(currentState);
    const incomingStateParse = JSON.stringify(incomingState);

    if (incomingState && currentStateParse !== incomingStateParse) {
      this.logStateChanges(currentState, incomingState);
      this._state.set(incomingState);
    }
  }

  protected patchState(partialState: Partial<T>): void {
    this.setState((currentState) => ({
      ...currentState,
      ...partialState,
    }));
  }
  
  private logStateChanges(previousState: T, nextState: T): void {
    console.info('state change detected:', {
      previous: previousState,
      next: nextState,
    });
  }
}
