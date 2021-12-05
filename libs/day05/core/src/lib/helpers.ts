import * as R from 'ramda';
import * as RA from 'ramda-adjunct';

import { Vent } from './models';

export const parseFileText = (fileText: string): Vent[] => {
  const groups = /\d(?:,)\d/gm;
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

export const createVentDiagram = (vents: Vent[]): number[][] => {
  return [];
};

export const mapDiagramToText = (diagram: number[][]): string => {
  return '';
};

export const drawVentDiagram = (diagramText: string): void => {
  console.log(diagramText);
};

export const numPointsOfOverlap = (diagram: number[][]): number => {
  return -1;
};

export const Helpers = {
  parseFileText,
  onlyHorizontalOrVerticalLines,
  createVentDiagram,
  mapDiagramToText,
  drawVentDiagram,
  numPointsOfOverlap,
};
