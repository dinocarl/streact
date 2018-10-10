import {
  compose,
  curry,
  merge,
  mergeAll,
  last,
  length,
  dec,
  nth
} from 'ramda';

// Base Functions
// initializeHistory :: (State, Date) -> History
const initializeHistory = (initialState, timestamp) => ([
  merge(
    { __ts: timestamp },
    initialState
  )
]);

// currentIdx :: History -> Index
const currentIdx = compose(
  dec,
  length
);

// currentState :: History -> State
const currentState = last;

// nextState :: State -> State -> Date -> State
const nextState = curry(
  (initialState, modifications, timestamp) => mergeAll([
    initialState,
    { __ts: timestamp },
    modifications
  ])
);

// at :: (History, Index) -> State
const at = nth;

// Eventing
function addEventListener(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler);
  } else {
    el.attachEvent(`on${eventName}`, () => handler.call(el));
  }
}

function triggerEvent(el, eventName, payload) {
  const event = new CustomEvent(eventName, payload);
  el.dispatchEvent(event);
}

// Store
class Store {
  constructor(id, initialState) {
    this.id = id;
    this.history = initializeHistory(initialState, new Date().valueOf());
  }

  currentIdx() {
    return currentIdx(this.history);
  }

  currentState() {
    return currentState(this.history);
  }

  update(data, silent) {
    const next = nextState(
      this.currentState(),
      data,
      new Date().valueOf()
    );
    this.history.push(next);
    if (silent !== `silent`) {
      triggerEvent(document, `StoreUpdated${this.id}`, { detail: next });
    }
    return next;
  }

  at(idx) {
    return at(idx, this.history);
  }

  reapply(idx) {
    const item = this.at(idx);
    this.history.push(item);
    triggerEvent(document, `StoreUpdated${this.id}`, { detail: item });
    return item;
  }
}

let storeHouseInstance;
// StoreHouse
class StoreHouse {
  constructor() {
    if (!storeHouseInstance) {
      storeHouseInstance = this;
    }
    this.Stores = {};
    return storeHouseInstance;
  }

  add(id, obj) {
    this.Stores[id] = obj;
    return obj;
  }
}

const appStores = () => new StoreHouse();

// Rendering
const render = curry((el, fn, state) => {
  if (el !== null) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    return el.appendChild(fn(state));
  }
  return null;
});

export {
  initializeHistory,
  currentIdx,
  currentState,
  nextState,
  at,
  StoreHouse,
  Store,
  render,
  appStores,
  addEventListener
};
