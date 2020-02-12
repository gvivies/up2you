import { TestBed } from '@angular/core/testing';

import { DashboardFacadeService } from './dashboard-facade.service';

describe('DashboardFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardFacadeService = TestBed.get(DashboardFacadeService);
    expect(service).toBeTruthy();
  });
});
