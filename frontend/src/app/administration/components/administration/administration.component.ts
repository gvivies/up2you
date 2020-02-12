import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AdminFacadeService} from '../../services/admin-facade.service';
import {Task, Player, Track} from '../../../core/generated/model';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  people$: Observable<Player[]>;
  tasks$: Observable<Task[]>;
  teams$: Observable<Player[]>;
  tracks$: Observable<Track[]>;

  constructor(private adminFacadeService: AdminFacadeService) { }

  ngOnInit() {
    this.people$ = this.adminFacadeService.getPeopleList$();
    this.tasks$ = this.adminFacadeService.getTasksList$();
    this.teams$ = this.adminFacadeService.getTeamsList$();
    this.tracks$ = this.adminFacadeService.getTracksList$();
  }

}
