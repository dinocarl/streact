import '../css/app.css';
import initialData from './data';
import {
  StoreHouse,
  Store,
  render,
  addEventListener
} from './framework';
import { html } from './components';
import appName from './config';

const appState = new Store(appName, initialData);
// make sure the initial state is duplicated in the Store
appState.update(initialData);

// Initialize the Store
const allStores = new StoreHouse();
allStores.add(appName, appState);

const appEl = document.getElementById(`app`);

// Re-render on state changes
addEventListener(document, `StoreUpdated${appName}`, (e) => render(appEl, html, e.detail));

// Initial render
render(
  appEl,
  html,
  allStores.Stores[appName].currentState()
);
