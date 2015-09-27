import {List, Map} from 'immutable';

export function loadMoviesInto(state, movies) {
  return state.set('movies', new List(movies));
}

export function next(state) {
  const movies = state.get('movies');
  return state.merge({
    vote: Map({pair: movies.take(2)}),
    movies: movies.skip(2)
  });
}

export function vote(state, movie) {
  return state.updateIn(
    ['vote', 'tally', movie],
    0,
    tally => tally + 1
  );
}



