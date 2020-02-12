import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {Place, Player, PlayerType, Track} from '../../../core/generated/model';
import {FormGroup} from '@angular/forms';
import {AdminFacadeService} from '../../services/admin-facade.service';
import {NotifierService} from '../../../shared/services/notifier-service';
import {Router} from '@angular/router';
import {AvailableRoutes} from '../../../core/routing/available-routes';
import {TrackService} from '../../../shared/services/track.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.scss']
})
export class EditTrackComponent implements OnInit, OnDestroy {

  track$: Observable<Track>;
  people$: Observable<Player[]>;
  teams$: Observable<Player[]>;
  availablePlayers$: BehaviorSubject<Player[]>;
  formGroup: FormGroup;
  formGroupSubscription: Subscription;
  playersSubscription: Subscription;
  title: string;
  playerType = PlayerType.PERSON;

  constructor(private adminFacadeService: AdminFacadeService,
              private trackService: TrackService,
              private notifierService: NotifierService,
              private router: Router) {
    this.availablePlayers$ = new BehaviorSubject<Player[]>([]);
    this.formGroup = this.trackService.buildFormGroup();
  }

  ngOnInit(): void {
    this.track$ = this.adminFacadeService.getSharedData$();
    this.people$ = this.adminFacadeService.getPeopleList$();
    this.teams$ = this.adminFacadeService.getTeamsList$();
    this.formGroupSubscription = this.track$.subscribe(track => this.setTitleAndFillFormGroup(track));
    this.buildAvailablePlayers$();
  }

  ngOnDestroy(): void {
    this.formGroupSubscription = undefined;
    this.playersSubscription = undefined;
    this.adminFacadeService.resetSharedData();
  }

  cancel(): void {
    this.router.navigate([AvailableRoutes.ADMINISTRATION]);
  }

  save(): void {
    const places = this.adminFacadeService.getSharedData().places;
    this.adminFacadeService.saveTrack(this.formGroup, places)
      .subscribe((p) => {
        this.notifierService.notifyInformation(`The task ${p.description} has been saved.`);
        this.cancel();
      });
  }

  private setTitleAndFillFormGroup(track: Track): void {
    if (track) {
      const verb = (track.id) ? 'Edit' : 'Create';
      this.title = `${verb} track`;
      this.formGroup = this.trackService.buildFormGroup();
      this.formGroup.controls.id.setValue(track.id);
      this.formGroup.controls.description.setValue(track.description);
      this.formGroup.controls.type.setValue(track.type);
      this.formGroup.controls.task.setValue(track.task);
      this.formGroup.controls.currentPosition.setValue(track.currentPosition);
    }
  }

  private buildAvailablePlayers$() {
    this.playersSubscription = combineLatest(this.track$, this.people$, this.teams$)
      .subscribe((value) => {
        const track = value[0];
        if (track) {
          const people = value[1];
          const teams = value[2];
          if (track.type === PlayerType.TEAM) {
            this.availablePlayers$.next(teams.filter(p => this.isAvailable(p, track.places)));
          } else {
            this.availablePlayers$.next(people.filter(p => this.isAvailable(p, track.places)));
          }
        }
      });
  }

  removePlace(place: Place): void {
    this.adminFacadeService.removePlaceFromTrack(place);
  }

  addAPlayer(player: Player): void {
    this.adminFacadeService.addPlaceToTrack(player);
  }

  moveDown(place: Place): void {
    this.adminFacadeService.movePlaceDown(place);
  }

  moveUp(place: Place): void {
    this.adminFacadeService.movePlaceUp(place);
  }

  private isAvailable(player: Player, places: Place[]): boolean {
    return !places.find(place => place.player.id === player.id);
  }
}
