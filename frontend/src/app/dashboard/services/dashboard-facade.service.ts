import { Injectable } from '@angular/core';
import {Store} from '../../core/state-management/store.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardFacadeService {

  constructor(private store: Store) { }

  getTracks$() {
    return this.store.getTracks$();
  }
}
