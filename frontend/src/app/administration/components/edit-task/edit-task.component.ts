import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Task} from '../../../core/generated/model';
import {FormGroup} from '@angular/forms';
import {AdminFacadeService} from '../../services/admin-facade.service';
import {NotifierService} from '../../../shared/services/notifier-service';
import {Router} from '@angular/router';
import {AvailableRoutes} from '../../../core/routing/available-routes';
import {TaskService} from '../../../shared/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit, OnDestroy {

  task$: Observable<Task>;
  formGroup: FormGroup;
  subscription: Subscription;
  title: string;

  constructor(private adminFacadeService: AdminFacadeService,
              private taskService: TaskService,
              private notifierService: NotifierService,
              private router: Router) {
    this.formGroup = this.taskService.buildFormGroup();
  }

  ngOnInit(): void {
    this.task$ = this.adminFacadeService.getSharedData$();
    this.subscription = this.task$.subscribe(task => this.setTitleAndFillFormGroup(task));
  }

  ngOnDestroy(): void {
    this.subscription = undefined;
    this.adminFacadeService.resetSharedData();
  }

  cancel(): void {
    this.router.navigate([AvailableRoutes.ADMINISTRATION]);
  }

  save(): void {
    this.adminFacadeService.saveTask(this.formGroup)
      .subscribe((p) => {
        this.notifierService.notifyInformation(`The task ${p.name} has been saved.`);
        this.cancel();
      });
  }

  private setTitleAndFillFormGroup(task: Task) {
    if (task) {
      const verb = (task.id) ? 'Edit' : 'Create';
      this.title = `${verb} task`;
      this.formGroup.controls.id.setValue(task.id);
      this.formGroup.controls.name.setValue(task.name);
    }
  }

}
