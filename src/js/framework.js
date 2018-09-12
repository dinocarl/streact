import {
  curry
} from 'ramda';

// Eventing
function addEventListener(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler);
  } else {
    el.attachEvent('on' + eventName, function() {
      handler.call(el);
    });
  }
}

function triggerEvent(el, eventName, payload) {
  const event = new CustomEvent(eventName, payload);
  el.dispatchEvent(event);
}
// Store
const Store = function (id, initialState) {
  this.history = [initialState, initialState];

  this.currentIdx = function currentIdx() {
    return this.history.length - 1;
  };

  this.currentState = function currentState() {
    return this.history[this.currentIdx()];
  };

  this.update = function update(data) {
    const next = Object.assign(
      {},
      this.currentState(),
      data
    );
    this.history.push(next);
    triggerEvent(document, 'AppStateUpdated' + id, {detail: next});
    return next;
  };

  this.at = function at(idx) {
    return this.history[idx];
  };

  this.reapply = function reapply(idx) {
    const item = this.at(idx);
    this.history.push(item);
    triggerEvent(document, 'AppStateUpdated' + id, {detail: item});
    return item;
  };
};

// Rendering
const render = curry((el, fn, state) => el.innerHTML = fn(state));

export {
  Store,
  render
};
