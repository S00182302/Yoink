import { TestBed } from '@angular/core/testing';

import { YoinkService } from './yoink.service';

describe('YoinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YoinkService = TestBed.get(YoinkService);
    expect(service).toBeTruthy();
  });
});
