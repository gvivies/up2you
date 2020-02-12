import { TestBed } from '@angular/core/testing';

import { DataVizualisationService } from './data-vizualisation.service';

describe('DataVisualisationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataVizualisationService = TestBed.get(DataVizualisationService);
    expect(service).toBeTruthy();
  });
});
