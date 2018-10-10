// Actions
import {
  map,
  merge,
  contains,
  append,
  concat
} from 'ramda';
import { appStores } from './framework';
import {
  mapWithIndex,
  strConcat,
  isInPlayMode
} from './utils';
import appName from './config';

const appState = () => appStores().Stores[appName];

// Event Handlers
// Side Effect-y
const revert = to => {
  appState().reapply(appState().history.length - to);
};

const commit = (to, state, attempt, match) => {
  appState().update(
    {
      cards: state,
      attempt: [],
      matched: match,
      numCorrect: match.length / 2
    }
  );
};

const stage = (to, state, attempt) => {
  appState().update(
    {
      attempt,
      cards: state
    }
  );
};

const stageThenRevert = (to, state, attempt) => {
  appState().update(
    {
      attempt,
      cards: state,
      mode: `pause`
    }
  );
  setTimeout(() => revert(3), 650);
};

const matchType = arr => {
  const matchCases = {
    falsefalse: stage,
    falsetrue: revert,
    truefalse: stageThenRevert,
    truetrue: commit,
  };
  return matchCases[strConcat([
    arr.length === 2 && arr[0].idx !== arr[1].idx,
    arr.length === 2 && arr[0].val === arr[1].val
  ])];
};

const flip = (state, idx) => {
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
  const currentMatches = state.matched;
  if (!contains(idx, currentMatches) && isInPlayMode(state)) {
    const nextAttempt = append(idx, state.attempt);
    const nextMatch = concat(currentMatches, nextAttempt);
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

    return matchType(possibleMatch)(2, nextState, nextAttempt, nextMatch);
  }
  return state;
};

export default flip;
