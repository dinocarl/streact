import {
  curry,
  merge,
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

let storeInstance;
// Store
class __Store {
  constructor(initialState) {
    if (!storeInstance) {
      storeInstance = this;
    }
    this.history = [initialState];
    return storeInstance;
  }

  currentIdx() {
    return this.history.length - 1;
  }

  currentState() {
    return last(this.history);
  }

  update(data) {
    const next = merge(
      this.currentState(),
      data
    );
    this.history.push(next);
    triggerEvent(document, `StoreUpdated`, { detail: next });
    return next;
  }

  at(idx) {
    return nth(idx, this.history);
  }

  reapply(idx) {
    const item = this.at(idx);
    this.history.push(item);
    triggerEvent(document, `StoreUpdated`, { detail: item });
    return item;
  }
}

function Store(initialState) {
  let instance;
  this.getInstance = function getInstance() {
    if (!instance) {
      return new __Store(initialState);
    }
    return instance;
  }
};

const appState = () => new Store().getInstance();

// Rendering
const render = curry((el, fn, state) => {
  while(el.firstChild){
    el.removeChild(el.firstChild);
  }
  el.appendChild(fn(state))}
);

export {
  Store,
  render,
  appState,
  addEventListener
};
