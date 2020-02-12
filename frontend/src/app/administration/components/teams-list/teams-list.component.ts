import {Component, Input, OnInit} from '@angular/core';
import {AdminFacadeService} from '../../services/admin-facade.service';
import {Observable} from 'rxjs';
import {Player, PlayerType} from '../../../core/generated/model';
import {AvailableRoutes} from '../../../core/routing/available-routes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent {

  @Input() teams: Player[];

  constructor(private adminFacadeService: AdminFacadeService,
              private router: Router) { }

  edit(team: Player) {
    this.navigateToEditForm(team);
  }

  add() {
    const newTeam = new Player();
    newTeam.type = PlayerType.TEAM;
    this.navigateToEditForm(newTeam);
  }

  remove(team: Player) {
    this.adminFacadeService.removePlayer(team);
  }

  private navigateToEditForm(team: Player): void {
    this.adminFacadeService.setSharedData(team);
    this.router.navigate([ AvailableRoutes.EDIT_PLAYER ]);
  }
}
