import {Store} from './store.service';
import {Injectable} from '@angular/core';
import {Action} from './action';
import {Operation} from './operation';
import {State} from './state';
import {StateService} from './state.service';

@Injectable({
  providedIn: 'root'
})
export class Dispatcher {

  constructor(private stateService: StateService) {
  }

  dispatch(action: Action): void {
    const previousState = this.stateService.get();
    let newState;
    switch (action.operation) {
      case Operation.SET_PEOPLE:
        newState = { ...previousState, people: action.data } as State;
        break;
      case Operation.SET_TEAMS:
        newState = { ...previousState, teams: action.data } as State;
        break;
      case Operation.SET_TASKS:
        newState = { ...previousState, tasks: action.data } as State;
        break;
      case Operation.SET_TRACKS:
        newState = { ...previousState, tracks: action.data } as State;
        break;
      case Operation.SET_SHARED_DATA:
        newState = { ...previousState, sharedData: action.data } as State;
        break;
      default:
        // Do nothing
    }
    if (newState) {
      this.stateService.set(newState);
    }
  }
}
