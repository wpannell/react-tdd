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
});
