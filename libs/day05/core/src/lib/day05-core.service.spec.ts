import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Day05CoreService } from './day05-core.service';

describe('Day05CoreService', () => {
  let service: Day05CoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(Day05CoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
