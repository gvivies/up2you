import { TestBed } from '@angular/core/testing';

import { TaskRepository } from './task-repository';

describe('TaskDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskRepository = TestBed.get(TaskRepository);
    expect(service).toBeTruthy();
  });
});
