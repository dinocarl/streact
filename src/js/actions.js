// Actions
import { map, merge } from 'ramda';
import { appState } from './framework';
import { mapWithIndex, strConcat } from './utils';

// Event Handlers
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
  if (currentMatches.indexOf(idx) === -1 && state.mode === `play`) {
    const nextAttempt = state.attempt.concat(idx);
    const nextMatch = currentMatches.concat(nextAttempt);
    const possibleMatch = map((item) => merge(
      { idx: item },
      currentCards[item]
    ), nextAttempt);
    const nextState = mapWithIndex((card, cardIndex) => merge(
      card,
      { dir: cardDirCases[cardIndex === idx][card.dir] }
    ), currentCards);

    return matchType(possibleMatch)(2, nextState, nextAttempt, nextMatch);
  }
  return state;
};

export default flip;
