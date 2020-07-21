import { TestBed } from '@angular/core/testing';

import { GithubuserserviceService } from './githubuserservice.service';

describe('GithubuserserviceService', () => {
  let service: GithubuserserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubuserserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
