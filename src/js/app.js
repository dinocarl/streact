import '../css/app.css';
import { map, merge } from 'ramda';
import defaultGameState, { gameVals, initialTitle, initialRoute } from './data';
import {
  StoreHouse,
  Store,
  render,
  addEventListener
} from './framework';
import {
  html,
  pageTitle,
  gameBoard
} from './components';
import {
  AppName,
  Router,
  MatchGame,
  Title
} from './config';

// Set up the board
const cards = map(
  (val) => ({ val, dir: `d` }),
  gameVals
);

const initialGameState = merge(
  defaultGameState,
  { cards }
);

// Bring all initial states for an inital app state
const initialAppState = merge(
  initialGameState,
  initialTitle
);

// Initialize the stores
const routerStore = new Store(Router, initialRoute);

const titleStore = new Store(Title, initialTitle);

const gameStore = new Store(MatchGame, initialGameState);

const appStore = new Store(AppName, initialAppState);

// Ensure the initial game state is duplicated for "undos"
gameStore.update(initialAppState);
// Sync appState with the game store
appStore.update(initialAppState);

// Initialize the StoreHouse
const allStores = new StoreHouse();
allStores.add(AppName, appStore);
allStores.add(Router, routerStore);
allStores.add(Title, titleStore);
allStores.add(MatchGame, gameStore);

window.as = allStores;
// Cache the app's root element
const appEl = document.getElementById(`app`);

// Re-render the entire app
addEventListener(document, `StoreUpdated${AppName}`, (e) => render(
  appEl,
  html,
  e.detail
));

// Re-render the title
addEventListener(document, `StoreUpdated${Title}`, (e) => render(
  document.getElementById(`title-container`),
  pageTitle,
  e.detail
));

// Re-render the game
addEventListener(document, `StoreUpdated${MatchGame}`, (e) => render(
  document.getElementById(`game-container`),
  gameBoard,
  e.detail
));

// Initial render
render(
  appEl,
  html,
  allStores.Stores[AppName].currentState()
);
