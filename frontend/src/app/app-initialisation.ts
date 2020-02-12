import {Injectable} from '@angular/core';
import {ConfigurationService} from './core/services/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitialisation {

  constructor(private configurationService: ConfigurationService) {
  }

  initializeApp(): void {
    this.configurationService.initPeople();
    this.configurationService.initTeams();
    this.configurationService.initTasks();
    this.configurationService.initTracks();
  }
}
