import {Component, Input} from '@angular/core';
import {Task} from 'src/app/core/generated/model';
import {AdminFacadeService} from '../../services/admin-facade.service';
import {AvailableRoutes} from '../../../core/routing/available-routes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {

  @Input() tasks: Task[];

  constructor(private adminFacadeService: AdminFacadeService,
              private router: Router) { }

  edit(task: Task) {
    this.navigateToEditForm(task);
  }

  add() {
    this.navigateToEditForm(new Task());
  }

  remove(task: Task) {
    this.adminFacadeService.removeTask(task);
  }

  private navigateToEditForm(task: Task): void {
    this.adminFacadeService.setSharedData(task);
    this.router.navigate([ AvailableRoutes.EDIT_TASK ]);
  }
}
