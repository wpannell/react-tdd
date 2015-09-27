import {expect} from 'chai';
import {List, Map} from 'immutable';
import {loadEntriesInto, next} from '../src/core';

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
        vote: new Map({pair: List.of('trainspotting', '28 days later')}),
        entries: List.of('sunshine')
      }));
    });
  });
});
