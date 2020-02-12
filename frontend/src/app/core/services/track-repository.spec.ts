import { TestBed } from '@angular/core/testing';

import { TrackRepository } from './track-repository';

describe('TrackDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrackRepository = TestBed.get(TrackRepository);
    expect(service).toBeTruthy();
  });
});
