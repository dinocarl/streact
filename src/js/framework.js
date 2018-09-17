import {
  curry,
  merge,
  mergeAll,
  last,
  nth
} from 'ramda';

//  Base Functions

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
    this.history = [
      merge(
        { __ts: new Date().valueOf() },
        initialState
      )
    ];
  }

  currentIdx() {
    return this.history.length - 1;
  }

  currentState() {
    return last(this.history);
  }

  update(data, silent) {
    const next = mergeAll([
      this.currentState(),
      { __ts: new Date().valueOf() },
      data
    ]);
    this.history.push(next);
    if (silent !== `silent`) {
      triggerEvent(document, `StoreUpdated${this.id}`, { detail: next });
    }
    return next;
  }

  at(idx) {
    return nth(idx, this.history);
  }

  reapply(idx) {
    const item = this.at(idx);
    this.history.push(item);
    triggerEvent(document, `StoreUpdated${this.id}`, { detail: item });
    return item;
  }
}

let storeHouseInstance;
// StoreHosue
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
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  el.appendChild(fn(state));
});

export {
  StoreHouse,
  Store,
  render,
  appStores,
  addEventListener
};
