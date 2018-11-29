import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracePage } from './trace.page';

describe('TracePage', () => {
  let component: TracePage;
  let fixture: ComponentFixture<TracePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
