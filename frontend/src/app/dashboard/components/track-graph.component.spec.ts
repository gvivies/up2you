import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackGraphComponent } from './track-graph.component';

describe('TrackGraphComponent', () => {
  let component: TrackGraphComponent;
  let fixture: ComponentFixture<TrackGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
