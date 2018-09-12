// HTML Components
import {
  compose,
  map,
  join
} from 'ramda';

const Card = (item, idx) => {
  const dirCases = {
    u: item.val,
    d: '✽ ✽ ✽'
  };
  return `
<li class="card ${item.dir}" onclick="flip('${idx}')">
  ${dirCases[item.dir]}
</li>`;
};

const Cards = compose(
  join(''),
  map(Card)
);

const CardsContainer = (list) => `
<ul class="cards">
  ${Cards(list)}
</ul>`;

const title = (props) => `
<h1 class="title">
  ${props.title}
</h1>`;

const totalIndicator = (props) => `
<h3 class="score">
  ${props.correctLabel}
  ${props.numCorrect}
</h3>`;

const html = (props) => `
<section class="match-game">
  ${title(props)}
  ${CardsContainer(props.cards)}
  ${totalIndicator(props)}
</section>`;

export {
  Card,
  Cards,
  CardsContainer,
  title,
  totalIndicator,
  html
};
