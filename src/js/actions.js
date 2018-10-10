// Actions
import { contains } from 'ramda';
import { appStores } from './framework';
import {
  strConcat,
  isInPlayMode
} from './utils';
import nextStateCandidate from './reducers';
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
      numCorrect: match.length
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
  if (!contains(idx, state.matched) && isInPlayMode(state)) {
    const {
      possibleMatch,
      nextState,
      nextAttempt,
      nextMatch
    } = nextStateCandidate(state, idx);
    return matchType(possibleMatch)(2, nextState, nextAttempt, nextMatch);
  }
  return state;
};

export default flip;
