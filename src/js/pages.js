import { section } from './h';
import {
  pageTitleContainer,
  appContent,
  gameBoardContainer
} from './components';

export const Game = props => section(
  pageTitleContainer(props),
  appContent(
    gameBoardContainer(props)
  )
);

export const About = props => section(
  pageTitleContainer(props),
  appContent(
    gameBoardContainer(props)
  )
);
