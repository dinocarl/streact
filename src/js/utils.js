import {
  map,
  addIndex,
  join
} from 'ramda';

export const strConcat = join(``);

export const mapWithIndex = addIndex(map);
