import {loadMoviesInto, next} from './core';

export default function reduce(state, action) {
  switch(action.type) {
    case 'LOAD_MOVIES' : return loadMoviesInto(state, action.movies);
    case 'NEXT' : return next(state);
  }
}
