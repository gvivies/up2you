import { TestBed } from '@angular/core/testing';

import { AdminFacadeService } from './admin-facade.service';

describe('AdminFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminFacadeService = TestBed.get(AdminFacadeService);
    expect(service).toBeTruthy();
  });
});
