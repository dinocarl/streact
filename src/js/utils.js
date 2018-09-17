import {
  compose,
  equals,
  prop,
  map,
  addIndex,
  join
} from 'ramda';

export const strConcat = join(``);

export const mapWithIndex = addIndex(map);

export const checkMode = prop(`mode`);

export const isInPlayMode = compose(
  equals(`play`),
  checkMode
);
