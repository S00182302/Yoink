import { TestBed } from '@angular/core/testing';

import { OpenfoodfactsService } from './openfoodfacts.service';

describe('OpenfoodfactsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenfoodfactsService = TestBed.get(OpenfoodfactsService);
    expect(service).toBeTruthy();
  });
});
