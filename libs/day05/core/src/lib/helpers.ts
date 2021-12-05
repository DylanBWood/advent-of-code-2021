import * as R from 'ramda';
import * as RA from 'ramda-adjunct';

import { Vent } from './models';

export const parseFileText = (fileText: string): Vent[] => {
  const groups = /\d+(?:,)\d+/gm;
  const matches = fileText.match(groups);
  let result = [] as Vent[];

  if (matches) {
    result = R.splitEvery(
      4,
      R.flatten(matches.map((match) => match.split(',').map(Number)))
    ).map(
      ([startX, startY, endX, endY]) =>
        ({ start: [startX, startY], end: [endX, endY] } as Vent)
    );
  }

  return result;
};

export const onlyHorizontalOrVerticalLines = (vents: Vent[]): Vent[] => {
  return vents.filter(
    ({ start, end }) => start[0] === end[0] || start[1] === end[1]
  );
};

export const createBlankDiagram = (vents: Vent[]): number[][] => {
  const maxX = Math.max(
    ...vents.map((vent) => Math.max(vent.start[0], vent.end[0]))
  );

  const maxY = Math.max(
    ...vents.map((vent) => Math.max(vent.start[1], vent.end[1]))
  );

  const diagram = R.times(
    () => Array.from({ length: maxX + 1 }, R.always(0)),
    maxY + 1
  );

  return diagram;
};

export const createVentDiagram = (vents: Vent[]): number[][] => {
  const diagram = createBlankDiagram(vents);

  const isVertical = (vent: Vent): boolean => vent.start[0] === vent.end[0];

  vents.forEach((vent) => {
    if (isVertical(vent)) {
      const minY = Math.min(vent.start[1], vent.end[1]);
      const maxY = Math.max(vent.start[1], vent.end[1]);

      for (let i = minY; i <= maxY; i++) {
        diagram[i][vent.start[0]]++;
      }
    } else {
      const minX = Math.min(vent.start[0], vent.end[0]);
      const maxX = Math.max(vent.start[0], vent.end[0]);

      for (let i = minX; i <= maxX; i++) {
        diagram[vent.start[1]][i]++;
      }
    }
  });

  return diagram;
};

export const mapDiagramToText = (diagram: number[][]): string => {
  return '';
};

export const drawVentDiagram = (diagramText: string): void => {
  console.log(diagramText);
};

export const maxOverlapNumber = (diagram: number[][]): number =>
  Math.max(...diagram.map((val) => Math.max(...val)));

export const numPointsOfOverlapOver2 = (diagram: number[][]): number => {
  const maxOverlapNum = 2;
  const numWithMax = diagram.reduce(
    (rowTotal, row) =>
      rowTotal +
      row.reduce(
        (columnTotal, column) =>
          columnTotal + (column >= maxOverlapNum ? 1 : 0),
        0
      ),
    0
  );

  return numWithMax;
};

export const Helpers = {
  parseFileText,
  onlyHorizontalOrVerticalLines,
  createBlankDiagram,
  createVentDiagram,
  mapDiagramToText,
  drawVentDiagram,
  maxOverlapNumber,
  numPointsOfOverlapOver2,
};
