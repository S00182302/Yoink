import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowProfilePage } from './follow-profile.page';

describe('FollowProfilePage', () => {
  let component: FollowProfilePage;
  let fixture: ComponentFixture<FollowProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
