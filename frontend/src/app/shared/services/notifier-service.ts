import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class NotifierService {

  private get TOAST_LIFETIME(): number {
    return 3000;
  }

  private toastMessage: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private isToastInfo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private toastDisplayed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loadingNotifier: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  notifyError(message: string): void {
    this.toastMessage.next(message);
    this.isToastInfo.next(false);
    this.displayToast();
  }

  notifyInformation(message: string): void {
    this.toastMessage.next(message);
    this.isToastInfo.next(true);
    this.displayToast();
  }

  getToastMessage$() {
    return this.toastMessage.asObservable();
  }

  isInfoNotification$() {
    return this.isToastInfo.asObservable();
  }

  isToastDisplayed$(): Observable<boolean> {
    return this.toastDisplayed$.asObservable();
  }

  notifyOnLoading(isLoading: boolean) {
    this.loadingNotifier.next(isLoading);
  }

  loadingNotification$(): Observable<boolean> {
    return this.loadingNotifier.asObservable();
  }

  private displayToast(): void {
    this.toastDisplayed$.next(true);
    setTimeout(() => this.toastDisplayed$.next(false), this.TOAST_LIFETIME);
  }

}
