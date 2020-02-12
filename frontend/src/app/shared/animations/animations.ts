import {transition, trigger, query, style, animate, stagger, state} from '@angular/animations';

export class Animations {

  static buildToastComponent() {
      return trigger('displayToast', [
        state('false',
          style({ opacity: 0, transform: 'translate(200%)', height: 0 })),
        state('true',
          style({ opacity: 1, transform: 'translate(0)' })),
        transition('false => true',
          animate('600ms cubic-bezier(0.23, 1, 0.32, 1)')),
        transition('true => false',
          animate('300ms ease-in-out'))
      ]);
  }
}
