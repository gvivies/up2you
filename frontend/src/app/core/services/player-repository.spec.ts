import { TestBed } from '@angular/core/testing';

import { PlayerRepository } from './player-repository';

describe('PlayerRepository', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerRepository = TestBed.get(PlayerRepository);
    expect(service).toBeTruthy();
  });
});
