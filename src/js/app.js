import '../css/app.css';
import { map, merge } from 'ramda';
import initialData, { gameBoard } from './data';
import {
  StoreHouse,
  Store,
  render,
  addEventListener
} from './framework';
import { html } from './components';
import appName from './config';

// Set up the board
const initialState = merge(
  initialData,
  {
    cards: map(
      (val) => ({ val, dir: `d` }),
      gameBoard
    )
  }
);

// Initialize the game's store
const appState = new Store(appName, initialState);
// make sure the initial state is duplicated in the Store
appState.update(initialState);

// Initialize the StoreHouse
const allStores = new StoreHouse();
allStores.add(appName, appState);

// Cache the app's root element
const appEl = document.getElementById(`app`);

// Re-render on state changes
addEventListener(document, `StoreUpdated${appName}`, (e) => render(appEl, html, e.detail));

// Initial render
render(
  appEl,
  html,
  allStores.Stores[appName].currentState()
);
