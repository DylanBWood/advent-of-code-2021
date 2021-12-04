import { TestBed } from '@angular/core/testing';

import { Day04CoreService } from './day04-core.service';

describe('Day04CoreService', () => {
  let service: Day04CoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Day04CoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
