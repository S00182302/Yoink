import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueregPage } from './continuereg.page';

describe('ContinueregPage', () => {
  let component: ContinueregPage;
  let fixture: ComponentFixture<ContinueregPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinueregPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueregPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
