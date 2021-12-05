import { TestBed } from '@angular/core/testing';

import { Day05CoreService } from './day05-core.service';

describe('Day05CoreService', () => {
  let service: Day05CoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Day05CoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
