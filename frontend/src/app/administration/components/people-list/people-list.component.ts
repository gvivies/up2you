import {Component, Input} from '@angular/core';
import {Player, PlayerType} from '../../../core/generated/model';
import {AdminFacadeService} from '../../services/admin-facade.service';
import {Router} from '@angular/router';
import {AvailableRoutes} from '../../../core/routing/available-routes';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent {

  @Input() people: Player[];

  constructor(private adminFacadeService: AdminFacadeService, private router: Router) { }

  edit(player: Player) {
    this.navigateToEditForm(player);
  }

  add() {
    const newPlayer = new Player();
    newPlayer.type = PlayerType.PERSON;
    this.navigateToEditForm(newPlayer);
  }

  remove(player: Player) {
    this.adminFacadeService.removePlayer(player);
  }

  private navigateToEditForm(player: Player): void {
    this.adminFacadeService.setSharedData(player);
    this.router.navigate([ AvailableRoutes.EDIT_PLAYER ]);
  }
}
