// Actions
import { contains } from 'ramda';
import { appStores } from './framework';
import {
  strConcat,
  isInPlayMode
} from './utils';
import nextStateCandidate from './reducers';
import {
  AppName,
  Router,
  MatchGame
} from './config';

const appState = () => appStores().Stores[AppName];
const gameState = () => appStores().Stores[MatchGame];
const routeState = () => appStores().Stores[Router];

// Event Handlers
// Side Effect-y
const revert = to => {
  const payload = gameState().reapply(gameState().history.length - to);
  appState().update(payload, `silent`);
  return payload;
};

const commit = (to, state, attempt, match) => {
  const commitState = {
    cards: state,
    attempt: [],
    matched: match,
    numCorrect: match.length / 2
  };

  const payload = gameState().update(commitState);
  appState().update(payload, `silent`);
  return payload;
};

const stage = (to, state, attempt) => {
  const stageState = {
    attempt,
    cards: state
  };

  const payload = gameState().update(stageState);
  appState().update(payload, `silent`);
  return payload;
};

const stageThenRevert = (to, state, attempt) => {
  const stageState = {
    attempt,
    cards: state,
    mode: `pause`
  };

  const payload = gameState().update(stageState);
  appState().update(payload, `silent`);
  setTimeout(() => revert(3), 650);
  return payload;
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

const routeTo = route => {
  const routeReq = { route };
  const payload = routeState().update(routeReq);
  appState().update(payload, `silent`);
  return payload;
};

export default flip;

export {
  commit,
  routeTo
};
