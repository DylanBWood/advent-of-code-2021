import { TestBed } from '@angular/core/testing';
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';

import { Helpers } from './helpers';
import { Vent } from './models';
import {
  mockFileText,
  mockVents,
  mockDiagram,
  mockBlankDiagram,
  mockFilteredVents,
} from './mocks';

describe('Helpers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(Helpers).toBeTruthy();
  });

  describe('parseFileText', () => {
    it('exists', () => {
      expect(Helpers.parseFileText).toBeTruthy();
    });

    it('parses the text correctly', () => {
      expect(Helpers.parseFileText(mockFileText)).toEqual(mockVents);
    });

    it('parses up 3 digits correctly', () => {
      const actual = Helpers.parseFileText(`309,347 -> 309,464`);
      const expected: Vent[] = [
        {
          start: [309, 347],
          end: [309, 464],
        },
      ];

      expect(actual).toEqual(expected);
    });

    it('parses up 9 digits correctly', () => {
      const actual = Helpers.parseFileText(
        `309309309,347309309 -> 309309309,464309309`
      );
      const expected: Vent[] = [
        {
          start: [309309309, 347309309],
          end: [309309309, 464309309],
        },
      ];

      expect(actual).toEqual(expected);
    });
  });

  describe('onlyHorizontalOrVerticalLines', () => {
    it('exists', () => {
      expect(Helpers.onlyHorizontalOrVerticalLines).toBeTruthy();
    });

    it('returns the correct vents', () => {
      expect(Helpers.onlyHorizontalOrVerticalLines(mockVents)).toEqual(
        mockFilteredVents
      );
    });
  });

  describe('createBlankDiagram', () => {
    it('exists', () => {
      expect(Helpers.createVentDiagram).toBeTruthy();
    });

    it('creates the blank diagram', () => {
      const actual = Helpers.createBlankDiagram(mockVents);
      const expected = mockBlankDiagram;

      expect(actual).toEqual(expected);
    });
  });

  describe('createVentDiagram', () => {
    it('exists', () => {
      expect(Helpers.createVentDiagram).toBeTruthy();
    });

    it('creates the vent diagram', () => {
      const actual = Helpers.createVentDiagram(mockFilteredVents);
      const expected = mockDiagram;

      expect(actual).toEqual(expected);
    });
  });

  describe('mapDiagramToText', () => {
    it('exists', () => {
      expect(Helpers.mapDiagramToText).toBeTruthy();
    });
  });

  describe('drawVentDiagram', () => {
    it('exists', () => {
      expect(Helpers.drawVentDiagram).toBeTruthy();
    });
  });

  describe('maxOverlapNumber', () => {
    it('exists', () => {
      expect(Helpers.maxOverlapNumber).toBeTruthy();
    });

    it('returns correct maximum overlap', () => {
      const actual = Helpers.maxOverlapNumber(mockDiagram);
      const expected = 3;

      expect(actual).toEqual(expected);
    });
  });

  describe('numPointsOfOverlapOver2', () => {
    it('exists', () => {
      expect(Helpers.numPointsOfOverlapOver2).toBeTruthy();
    });

    it('returns correct number of overlaps above 2', () => {
      const actual = Helpers.numPointsOfOverlapOver2(mockDiagram);
      const expected = 3;

      expect(actual).toEqual(expected);
    });
  });
});
