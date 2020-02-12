import { Component, OnInit } from '@angular/core';
import {Animations} from '../../animations/animations';
import {Observable} from 'rxjs';
import {NotifierService} from '../../services/notifier-service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    Animations.buildToastComponent()
  ]
})
export class ToastComponent implements OnInit {

  isInfo$: Observable<boolean>;
  message$: Observable<string>;
  isDisplayed$: Observable<boolean>;

  constructor(private notifierService: NotifierService) {
  }

  ngOnInit() {
    this.isInfo$ = this.notifierService.isInfoNotification$();
    this.isDisplayed$ = this.notifierService.isToastDisplayed$();
    this.message$ = this.notifierService.getToastMessage$();
  }

}
