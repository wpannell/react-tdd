import {expect} from 'chai';
import {List, Map} from 'immutable';
import {loadEntriesInto, next, vote} from '../src/core';

describe('core logic', () => {

  describe('load entries produces state ', () => {

    it('from immutable', () => {
      const state = Map();

      const entries = (List.of(
        'trainspotting',
        '28 days later'
      ));

      const nextState = loadEntriesInto(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of(
          'trainspotting',
          '28 days later'
        )}));
    });

    it('from iterable', () => {
      const state = Map();

      const entries = [
        'trainspotting',
        '28 days later'
      ];

      const nextState = loadEntriesInto(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of(
          'trainspotting',
          '28 days later'
        )}));
    });
  });

  describe('next', () => {
    it('takes the next 2 entries on which to vote', () => {
      const state = Map({
        entries: List.of(
          'trainspotting',
          '28 days later',
          'sunshine'
        )
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({pair: List.of('trainspotting', '28 days later')}),
        entries: List.of('sunshine')
      }));
    });
  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('trainspotting', '28 days later')
        }),
        entries: List.of('sunshine')
      });

      const nextState = vote(state, 'trainspotting');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('trainspotting', '28 days later'),
          tally: Map({'trainspotting': 1})
        }),
        entries: List.of('sunshine')
      }));
    });

    it('increments a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('trainspotting', '28 days later'),
          tally: Map({'trainspotting': 3}, {'28 days later': 2})
        }),
        entries: List.of('sunshine')
      });

      const nextState = vote(state, 'trainspotting');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('trainspotting', '28 days later'),
          tally: Map({'trainspotting': 4}, {'28 days later': 2})
        }),
        entries: List.of('sunshine')
      }));
    });
  });
});
