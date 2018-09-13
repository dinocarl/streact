import '../css/app.css';
import initialData from './data';
import { Store, render, addEventListener } from './framework';
import { html } from './components';

// App Stuff
const appState = new Store(initialData);

// make sure the initial state is duplicated in the Store
appState.getInstance().update(initialData);

const appEl = document.getElementById(`app`);

// Re-render on state changes
addEventListener(document, `StoreUpdated`, (e) => render(appEl, html, e.detail));

// Initial render
render(
  appEl,
  html,
  appState.getInstance().currentState()
);
