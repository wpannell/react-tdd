import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function loadMoviesInto(state, movies) {
  return state.set('movies', new List(movies));
}

function getWinners(vote) {
  if (!vote) return [];

  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);

  if(aVotes > bVotes)
    return [a];
  else if(aVotes < bVotes)
    return [b];
  else
    return [a, b];
}

export function next(state) {
  const movies = state
    .get('movies')
    .concat(getWinners(state.get('vote')));

  if(movies.size === 1) {
    return state
      .remove('vote')
      .remove('movies')
      .set('winner', movies.first());
  }
  else {
    return state.merge({
      vote: Map({pair: movies.take(2)}),
      movies: movies.skip(2)
    });
  }
}

export function vote(state, movie) {
  return state.updateIn(
    ['tally', movie],
    0,
      tally => tally + 1
  );
}



