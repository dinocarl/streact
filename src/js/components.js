// HTML Components
import { mapWithIndex } from './utils';
import { appStores } from './framework';
import flip from './actions';
import { MatchGame } from './config';

import {
  li,
  ul,
  h1,
  h3,
  div,
  section
} from './h';

export const Card = (item, idx) => {
  const dirCases = {
    u: item.val,
    d: `✽ ✽ ✽`
  };
  return li(
    {
      className: `card ${item.dir}`,
      onclick: () => flip(appStores().Stores[MatchGame].currentState(), idx)
    },
    dirCases[item.dir]
  );
};

export const Cards = mapWithIndex(Card);

export const CardsContainer = list => ul(
  { className: `cards` },
  Cards(list)
);

export const pageTitle = props => h1(
  {
    id: `page-title`,
    className: `page-title`
  },
  props.title
);

export const pageTitleContainer = props => div(
  { id: `title-container` },
  pageTitle(props)
);

export const totalIndicator = props => h3(
  { className: `score` },
  `${props.correctLabel} ${props.numCorrect}`
);

export const game = props => section(
  { className: `match-game` },
  CardsContainer(props.cards),
  totalIndicator(props)
);

export const appContent = props => div(
  {
    id: `app-content`,
    className: `app-content`
  },
  game(props)
);

export const html = props => section(
  pageTitleContainer(props),
  appContent(props)
);
