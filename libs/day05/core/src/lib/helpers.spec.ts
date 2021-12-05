import { TestBed } from '@angular/core/testing';

import { Helpers } from './helpers';
import { Vent } from './models';

describe('Helpers', () => {
  const mockFileText = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4`;
  const mockVents: Vent[] = [
    {
      start: [0, 9],
      end: [5, 9],
    },
    {
      start: [8, 0],
      end: [0, 8],
    },
    {
      start: [9, 4],
      end: [3, 4],
    },
  ];

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
  });

  describe('onlyHorizontalOrVerticalLines', () => {
    it('exists', () => {
      expect(Helpers.onlyHorizontalOrVerticalLines).toBeTruthy();
    });

    it('returns the correct vents', () => {
      expect(Helpers.onlyHorizontalOrVerticalLines(mockVents)).toEqual([
        mockVents[0],
        mockVents[2],
      ]);
    });
  });

  describe('createVentDiagram', () => {
    it('exists', () => {
      expect(Helpers.createVentDiagram).toBeTruthy();
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

  describe('numPointsOfOverlap', () => {
    it('exists', () => {
      expect(Helpers.numPointsOfOverlap).toBeTruthy();
    });
  });
});
