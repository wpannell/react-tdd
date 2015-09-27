import {expect} from 'chai';
import {List, Map} from 'immutable';
import {loadEntriesInto} from '../src/core';

describe('core logic', () => {

  describe('load entries produces new state ', () => {

    it('from immutable', () => {
      const state = new Map();

      const entries = (List.of(
        'trainspotting',
        '28 days later'
      ));

      const nextState = loadEntriesInto(state, entries);

      expect(nextState).to.equal(new Map({
        entries: List.of(
          'trainspotting',
          '28 days later'
        )}));
    });

    it('from iterable', () => {
      const state = new Map();

      const entries = [
        'trainspotting',
        '28 days later'
      ];

      const nextState = loadEntriesInto(state, entries);

      expect(nextState).to.equal(new Map({
        entries: List.of(
          'trainspotting',
          '28 days later'
        )}));
    });
  });

  describe('next', () => {

    function next(state) {
      const entries = state.get('entries');
      return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
      });
    }

    it('takes the next 2 entries on which to vote', () => {
      const state = new Map({
        entries: List.of(
          'trainspotting',
          '28 days later',
          'sunshine'
        )
      });

      const nextState = next(state);

      expect(nextState).to.equal(new Map({
        vote: Map({
          pair: List.of('trainspotting', '28 days later')
        }),
        entries: List.of('sunshine')
      }));
    });
  });
});
