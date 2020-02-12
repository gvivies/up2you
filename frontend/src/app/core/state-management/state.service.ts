import {Injectable} from '@angular/core';
import {State} from './state';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private readonly state$: BehaviorSubject<State> = new BehaviorSubject(new State());

  constructor() {
  }

  get(): State {
    return this.state$.value;
  }

  get$(): Observable<State> {
    return this.state$;
  }

  set(state: State): void {
    this.state$.next(state);
  }
}
