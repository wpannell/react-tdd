import {Map} from 'immutable';
import {loadMoviesInto, next, vote} from './core';

const executors = Map({
  LOAD_MOVIES: function(state, action) {
    return loadMoviesInto(state, action.movies)},

  NEXT: function(state) {
    return next(state)},

  VOTE: function(state, action) {
    return vote(state, action.movie)}
});

export default function reduce(state, action) {
  return executors.get(action.type)(state, action);
}
