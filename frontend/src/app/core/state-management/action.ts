import {Operation} from './operation';

export interface Action {
  operation: Operation;
  data: any;
}
