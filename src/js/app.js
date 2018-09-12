import '../css/app.css';
import initialData from './data';
import { Store, render } from './framework';
import { html } from './components';

const appState = new Store('app', initialData);

render(
  document.getElementById('app'),
  html,
  appState.currentState()
);
