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

const isHorizontalOrVertical = (vent: Vent): boolean =>
  vent.start[0] === vent.end[0] || vent.start[1] === vent.end[1];

export const onlyHorizontalOrVerticalLines = (vents: Vent[]): Vent[] => {
  return vents.filter((vent) => isHorizontalOrVertical(vent));
};

const isDiagonal = (vent: Vent): boolean => {
  const maxX = Math.max(vent.start[0], vent.end[0]);
  const maxY = Math.max(vent.start[1], vent.end[1]);
  const maxStepX = Math.abs(vent.start[0] - vent.end[0]);
  const maxStepY = Math.abs(vent.start[1] - vent.end[1]);

  return maxStepX === maxStepY;
};

export const onlyHorizontalVerticalOrDiagonalLines = (
  vents: Vent[]
): Vent[] => {
  return vents.filter(
    (vent) => isHorizontalOrVertical(vent) || isDiagonal(vent)
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

export const createVentDiagramWithDiagonals = (vents: Vent[]): number[][] => {
  const diagram = createBlankDiagram(vents);

  const isVertical = (vent: Vent): boolean => vent.start[0] === vent.end[0];
  const isHorizontal = (vent: Vent): boolean => vent.start[1] === vent.end[1];

  vents.forEach((vent) => {
    const minY = Math.min(vent.start[1], vent.end[1]);
    const maxY = Math.max(vent.start[1], vent.end[1]);

    const minX = Math.min(vent.start[0], vent.end[0]);
    const maxX = Math.max(vent.start[0], vent.end[0]);

    if (isVertical(vent)) {
      console.log('vertical', vent);
      for (let i = minY; i <= maxY; i++) {
        diagram[i][vent.start[0]]++;
      }
    } else if (isHorizontal(vent)) {
      console.log('horizontal', vent);
      for (let i = minX; i <= maxX; i++) {
        diagram[vent.start[1]][i]++;
      }
    } else {
      for (
        let x = vent.start[0], y = vent.start[1];
        vent.start[0] === maxX ? x >= vent.end[0] : x <= vent.end[0];
        x += Math.sign(vent.end[0] - vent.start[0]),
          y += Math.sign(vent.end[1] - vent.start[1])
      ) {
        diagram[y][x]++;
      }
    }
  });

  return diagram;
};

export const mapDiagramToText = (diagram: number[][]): string => {
  const diagramText = diagram
    .map((row) =>
      row
        .map((val) => (val === 0 ? '.' : val.toString()))
        .join('')
        .trim()
    )
    .join('\n'); // test didn't like '\r\n' -- look into

  return diagramText;
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
  onlyHorizontalVerticalOrDiagonalLines,
  createBlankDiagram,
  createVentDiagram,
  createVentDiagramWithDiagonals,
  mapDiagramToText,
  drawVentDiagram,
  maxOverlapNumber,
  numPointsOfOverlapOver2,
};
