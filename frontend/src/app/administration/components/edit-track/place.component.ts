import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Place} from '../../../core/generated/model';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent {

  @Input() place: Place;
  @Input() nbPlaces: number;
  @Output() remover: EventEmitter<Place> = new EventEmitter<Place>();
  @Output() moverUp: EventEmitter<Place> = new EventEmitter<Place>();
  @Output() moverDown: EventEmitter<Place> = new EventEmitter<Place>();

  constructor() { }

  remove(place: Place): void {
    this.remover.emit(place);
  }

  moveUp(place: Place): void {
    this.moverUp.emit(place);
  }

  moveDown(place: Place): void {
    this.moverDown.emit(place);
  }
}
