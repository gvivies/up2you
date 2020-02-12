import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Place, Player} from '../../../core/generated/model';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {

  @Input()  availablePlayers: Player[];
  @Input()  places: Place[];
  @Output()  playerAdder: EventEmitter<Player> = new EventEmitter<Player>();

  selectedPlayer: Player;

  constructor() { }

  ngOnInit() {
  }

  addPlayer() {
     this.playerAdder.emit(this.selectedPlayer);
  }

  /*
  selectPlayer(value: Player) {
    this.selectedPlayer = value;
  }*/
}
