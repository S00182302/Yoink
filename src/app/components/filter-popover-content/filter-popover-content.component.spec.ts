import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPopoverContentComponent } from './filter-popover-content.component';

describe('FilterPopoverContentComponent', () => {
  let component: FilterPopoverContentComponent;
  let fixture: ComponentFixture<FilterPopoverContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPopoverContentComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPopoverContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
