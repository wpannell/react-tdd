import {Map} from 'immutable';
import {loadMoviesInto, next} from './core';

const executors = Map({
  LOAD_MOVIES: function(state, action) {return loadMoviesInto(state, action.movies)},
  NEXT: function(state, action) {return next(state)},
});

export default function reduce(state, action) {
  return executors.get(action.type)(state, action);
}
