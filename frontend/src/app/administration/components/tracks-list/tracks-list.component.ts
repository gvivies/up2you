import {Component, Input, OnInit} from '@angular/core';
import {AdminFacadeService} from '../../services/admin-facade.service';
import {Observable} from 'rxjs';
import {Player, Track} from '../../../core/generated/model';
import {AvailableRoutes} from '../../../core/routing/available-routes';
import {Router} from '@angular/router';
import {Tools} from '../../../core/services/tools';

@Component({
  selector: 'app-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent {

  @Input() tracks: Track[];

  constructor(private adminFacadeService: AdminFacadeService,
              private router: Router) { }

  edit(track: Track): void {
    this.navigateToEditForm(track);
  }

  private navigateToEditForm(track: Track) {
    const draftTrack = Tools.cloneTrack(track);
    this.adminFacadeService.setSharedData(draftTrack);
    this.router.navigate([ AvailableRoutes.EDIT_TRACK ]);
  }

  remove(track: Track) {

  }
}
