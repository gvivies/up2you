import {Injectable} from '@angular/core';
import {Player, PlayerType} from '../../core/generated/model';
import {PlayerRepository} from '../../core/services/player-repository';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Dispatcher} from '../../core/state-management/dispatcher.service';
import {Operation} from '../../core/state-management/operation';
import {Store} from '../../core/state-management/store.service';
import {Action} from '../../core/state-management/action';
import {FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private playerRepository: PlayerRepository,
              private store: Store,
              private dispatcher: Dispatcher) { }

  loadPeople(): void {
    this.playerRepository.listPeople$().subscribe(
      (players) => this.dispatcher
        .dispatch({ operation: Operation.SET_PEOPLE, data: players } as Action ));
  }

  loadTeams() {
    this.playerRepository.listTeams$().subscribe(
      (teams) => this.dispatcher
        .dispatch({ operation: Operation.SET_TEAMS, data: teams } as Action ));
  }

  update$(player: Player): Observable<Player> {
    return this.playerRepository.update$(player).pipe(
      tap(p => this.updateInState(p))
    );
  }

  create$(player: Player): Observable<Player> {
    return this.playerRepository.create$(player).pipe(
      tap(p => this.insertIntoState(p))
    );
  }

  delete$(player: Player): Observable<any> {
    return this.playerRepository.delete$(player).pipe(
      tap(p => this.removeFromState(player))
    );
  }

  buildFormGroup() {
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      position: new FormControl(''),
      picture: new FormControl(''),
      type: new FormControl('')
    });
  }

  getPlayerFromFormGroup(formGroup: FormGroup) {
    const player = new Player();
    player.id = formGroup.controls.id.value;
    player.name = formGroup.controls.name.value;
    player.position = formGroup.controls.position.value;
    player.picture = formGroup.controls.picture.value;
    player.type = formGroup.controls.type.value;
    return player;
  }

  private insertIntoState(player: Player) {
    this.modifyState(player, true);
  }

  private updateInState(player: Player) {
    this.modifyState(player, false);
  }
  private modifyState(player: Player, isNew: boolean) {
    const players = (player.type === PlayerType.PERSON) ? this.store.getPeople() : this.store.getTeams();
    if (isNew) {
      players.push(player);
    } else {
      const indexToUpdate = players.findIndex(p => p.id === player.id);
      players[indexToUpdate] = player;
    }
    const ope = (player.type === PlayerType.PERSON) ? Operation.SET_PEOPLE : Operation.SET_TEAMS;
    this.dispatcher.dispatch({ operation: ope, data: players} as Action);
  }

  private removeFromState(player: Player) {
    const players = (player.type === PlayerType.PERSON) ? this.store.getPeople() : this.store.getTeams();
    const indexToRemove = players.findIndex(p => p.id === player.id);
    players.splice(indexToRemove, 1);
    const ope = (player.type === PlayerType.PERSON) ? Operation.SET_PEOPLE : Operation.SET_TEAMS;
    this.dispatcher.dispatch({ operation: ope, data: players} as Action);
  }
}
