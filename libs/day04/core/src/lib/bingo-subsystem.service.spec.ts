import { TestBed } from '@angular/core/testing';

import { BingoSubsystemService } from './bingo-subsystem.service';

describe('BingoSubsystemService', () => {
  let service: BingoSubsystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingoSubsystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
