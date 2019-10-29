import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPopoverContentComponent } from './post-popover-content.component';

describe('PostPopoverContentComponent', () => {
  let component: PostPopoverContentComponent;
  let fixture: ComponentFixture<PostPopoverContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPopoverContentComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPopoverContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
