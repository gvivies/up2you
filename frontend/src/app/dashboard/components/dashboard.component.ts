import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Track} from '../../core/generated/model';
import {DashboardFacadeService} from '../services/dashboard-facade.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tracks$: Observable<Track[]>;

  constructor(private dashboardFacadeService: DashboardFacadeService) { }

  ngOnInit() {
    this.tracks$ = this.dashboardFacadeService.getTracks$();
  }

}
