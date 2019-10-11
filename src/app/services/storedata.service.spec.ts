import { TestBed } from '@angular/core/testing';

import { StoredataService } from './storedata.service';

describe('StoredataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoredataService = TestBed.get(StoredataService);
    expect(service).toBeTruthy();
  });
});
