import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { AdministrationComponent } from './administration/components/administration/administration.component';
import { PeopleListComponent } from './administration/components/people-list/people-list.component';
import {RouterModule} from '@angular/router';
import {AppRouting} from './core/routing/app-routing';
import {HttpClientModule} from '@angular/common/http';
import {AdminFacadeService} from './administration/services/admin-facade.service';
import {CrudService} from './core/services/crud-service';
import { TasksListComponent } from './administration/components/tasks-list/tasks-list.component';
import {AppInitialisation} from './app-initialisation';
import { TracksListComponent } from './administration/components/tracks-list/tracks-list.component';
import { TeamsListComponent } from './administration/components/teams-list/teams-list.component';
import { EditPeopleComponent } from './administration/components/edit-people/edit-people.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlayerRepository} from './core/services/player-repository';
import {ToastComponent} from './shared/components/toast/toast.component';
import {NotifierService} from './shared/services/notifier-service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EditTaskComponent } from './administration/components/edit-task/edit-task.component';
import { EditTrackComponent } from './administration/components/edit-track/edit-track.component';
import { PlaceComponent } from './administration/components/edit-track/place.component';
import { AddPlaceComponent } from './administration/components/edit-track/add-place.component';
import { TrackGraphComponent } from './dashboard/components/track-graph.component';
import { TeamViewComponent } from './team-view/team-view.component';

export function init_app(appInitService: AppInitialisation) {
  return () => appInitService.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ToastComponent,
    DashboardComponent,
    AdministrationComponent,
    PeopleListComponent,
    TasksListComponent,
    TracksListComponent,
    TeamsListComponent,
    EditPeopleComponent,
    EditTaskComponent,
    EditTrackComponent,
    PlaceComponent,
    AddPlaceComponent,
    TrackGraphComponent,
    TeamViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(AppRouting.getMenus(), {useHash: true}),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [ AppInitialisation ], multi: true },
    AdminFacadeService,
    CrudService,
    NotifierService,
    PlayerRepository,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
