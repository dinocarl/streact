// HTML Components
import { mapWithIndex } from './utils';
import { appState } from './framework';
import flip from './actions';

import {
  li,
  ul,
  h1,
  h3,
  section
} from './h';

const Card = (item, idx) => {
  const dirCases = {
    u: item.val,
    d: `✽ ✽ ✽`
  };
  return li(
    {
      className: `card ${item.dir}`,
      onclick: () => flip(appState().currentState(), idx)
    },
    dirCases[item.dir]
  );
};

const Cards = mapWithIndex(Card);

const CardsContainer = list => ul(
  { className: `cards` },
  Cards(list)
);

const title = props => h1(
  { className: `title` },
  props.title
);

const totalIndicator = props => h3(
  { className: `score` },
  `${props.correctLabel} ${props.numCorrect}`
);

const html = props => section(
  { className: `match-game` },
  title(props),
  CardsContainer(props.cards),
  totalIndicator(props)
);

export {
  Card,
  Cards,
  CardsContainer,
  title,
  totalIndicator,
  html
};
