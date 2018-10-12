import {
  append,
  concat,
  map,
  merge,
} from 'ramda';

import { mapWithIndex } from './utils';

const nextStateCandidate = (state, idx) => {
  const cardDirCases = {
    true: {
      d: `u`,
      u: `d`
    },
    false: {
      d: `d`,
      u: `u`
    }
  };
  const currentCards = state.cards;
  const nextAttempt = append(idx, state.attempt);
  const nextMatch = concat(state.matched, nextAttempt);
  const possibleMatch = map(
    (item) => merge(
      { idx: item },
      currentCards[item]
    ),
    nextAttempt
  );
  const nextState = mapWithIndex(
    (card, cardIndex) => merge(
      card,
      { dir: cardDirCases[cardIndex === idx][card.dir] }
    ),
    currentCards
  );

  return {
    possibleMatch,
    nextState,
    nextAttempt,
    nextMatch
  };
};

export default nextStateCandidate;
