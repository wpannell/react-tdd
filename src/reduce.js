import {loadMoviesInto} from './core';

export default function reduce(state, action) {
  return loadMoviesInto(state, action.movies);
}
