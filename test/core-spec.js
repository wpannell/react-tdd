import {expect} from 'chai';
import {List, Map} from 'immutable';
import {loadEntriesInto} from '../src/core';

describe('application logic', () => {
  describe('load entries', () => {

    it('produces new state from immutable', () => {
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
  });
});
