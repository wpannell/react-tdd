import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutable', () => {
  describe('Number', () => {

    function increment(state) {
      return state + 1;
    }

    it('does not change', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('List', () => {

    function addMovie(state, movie) {
      return state.push(movie);
    }

    it('does not change', () => {
      let state = List.of(
        'trainspotting',
        '28 days later'
      );

      let nextState = addMovie(state, 'sunshine');

      expect(nextState).to.equal(List.of(
        'trainspotting',
        '28 days later',
        'sunshine'
      ));

      expect(state).to.equal(List.of(
        'trainspotting',
        '28 days later'
      ));
    });
  });

  describe('tree', () => {

    function addMovie(state, movie) {
      return state.set('movies', state.get('movies').push(movie));
    }

    it('does not change', () => {
      let state = Map({
        movies: List.of(
          'trainspotting',
          '28 days later'
        )
      });

      let nextState = addMovie(state, 'sunshine');

      expect(nextState).to.equal(Map({
        movies: List.of(
          'trainspotting',
          '28 days later',
          'sunshine'
        )
      }));

      expect(state).to.equal(Map({
        movies: List.of(
          'trainspotting',
          '28 days later'
        )
      }));
    });
  });
});
