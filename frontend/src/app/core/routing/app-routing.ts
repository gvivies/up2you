import {AdministrationComponent} from '../../administration/components/administration/administration.component';
import {AvailableRoutes} from './available-routes';
import {DashboardComponent} from '../../dashboard/components/dashboard.component';
import {EditPeopleComponent} from '../../administration/components/edit-people/edit-people.component';
import {EditTaskComponent} from '../../administration/components/edit-task/edit-task.component';
import {EditTrackComponent} from '../../administration/components/edit-track/edit-track.component';
import {TeamViewComponent} from '../../team-view/team-view.component';

export class AppRouting {
  static getMenus() {
    return [
      {
        path: AvailableRoutes.DASHBOARD,
        component: DashboardComponent
      },
      {
        path: AvailableRoutes.TEAM_VIEW,
        component: TeamViewComponent
      },
      {
        path: AvailableRoutes.ADMINISTRATION,
        component: AdministrationComponent
      },
      {
        path: AvailableRoutes.EDIT_PLAYER,
        component: EditPeopleComponent
      },
      {
        path: AvailableRoutes.EDIT_TASK,
        component: EditTaskComponent
      },
      {
        path: AvailableRoutes.EDIT_TRACK,
        component: EditTrackComponent
      },
      {
        path: '',
        redirectTo: AvailableRoutes.DASHBOARD,
        pathMatch: 'full'
      }
    ];
  }
}
