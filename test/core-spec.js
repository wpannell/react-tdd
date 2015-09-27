import {expect} from 'chai';
import {List, Map} from 'immutable';
import {loadMoviesInto, next, vote} from '../src/core';

describe('core logic', () => {

  describe('load movies produces new state ', () => {

    it('from immutable', () => {
      const state = Map();

      const movies = (List.of(
        'trainspotting',
        '28 days later'
      ));

      const nextState = loadMoviesInto(state, movies);

      expect(nextState).to.equal(Map({
        movies: List.of(
          'trainspotting',
          '28 days later'
        )})
      );
    });

    it('from iterable', () => {
      const state = Map();

      const movies = [
        'trainspotting',
        '28 days later'
      ];

      const nextState = loadMoviesInto(state, movies);

      expect(nextState).to.equal(Map({
        movies: List.of(
          'trainspotting',
          '28 days later'
        )})
      );
    });
  });

  describe('next', () => {
    it('takes the next 2 movies on which to vote', () => {
      const state = Map({
        movies: List.of(
          'trainspotting',
          '28 days later',
          'sunshine'
        )
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({pair: List.of('trainspotting', '28 days later')}),
        movies: List.of('sunshine')
      }));
    });
  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('trainspotting', '28 days later')
        }),
        movies: List.of('sunshine')
      });

      const nextState = vote(state, 'trainspotting');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('trainspotting', '28 days later'),
          tally: Map({'trainspotting': 1})
        }),
        movies: List.of('sunshine')
      }));
    });

    it('increments a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('trainspotting', '28 days later'),
          tally: Map({'trainspotting': 3}, {'28 days later': 2})
        }),
        movies: List.of('sunshine')
      });

      const nextState = vote(state, 'trainspotting');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('trainspotting', '28 days later'),
          tally: Map({'trainspotting': 4}, {'28 days later': 2})
        }),
        movies: List.of('sunshine')
      }));
    });
  });
});
