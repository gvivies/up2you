import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminFacadeService} from '../../services/admin-facade.service';
import {Player, PlayerType} from '../../../core/generated/model';
import {Observable, Subscription} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {AvailableRoutes} from '../../../core/routing/available-routes';
import {PlayerService} from '../../../shared/services/player.service';
import {NotifierService} from '../../../shared/services/notifier-service';

@Component({
  selector: 'app-edit-people',
  templateUrl: './edit-people.component.html',
  styleUrls: ['./edit-people.component.scss']
})
export class EditPeopleComponent implements OnInit, OnDestroy {

  player$: Observable<Player>;
  formGroup: FormGroup;
  subscription: Subscription;
  title: string;

  constructor(private adminFacadeService: AdminFacadeService,
              private playerService: PlayerService,
              private notifierService: NotifierService,
              private router: Router) {
    this.formGroup = this.playerService.buildFormGroup();
  }

  ngOnInit(): void {
   this.player$ = this.adminFacadeService.getSharedData$();
   this.subscription = this.player$.subscribe(player => this.setTitleAndFillFormGroup(player));
  }

  ngOnDestroy(): void {
    this.subscription = undefined;
    this.adminFacadeService.resetSharedData();
  }

  cancel(): void {
    this.router.navigate([AvailableRoutes.ADMINISTRATION]);
  }

  save(): void {
    this.adminFacadeService.savePlayer(this.formGroup)
      .subscribe((p) => {
        this.notifierService.notifyInformation(`The player ${p.name} has been saved.`);
        this.cancel();
      });
  }

  private setTitleAndFillFormGroup(player: Player) {
    if (player) {
      const verb = (player.id) ? 'Edit' : 'Create';
      const target = (player.type === PlayerType.PERSON) ? 'person' : 'team';
      this.title = `${verb} ${target}`;
      this.formGroup.controls.id.setValue(player.id);
      this.formGroup.controls.name.setValue(player.name);
      this.formGroup.controls.position.setValue(player.position);
      this.formGroup.controls.picture.setValue(player.picture);
      this.formGroup.controls.type.setValue(player.type);
    }
  }
}
