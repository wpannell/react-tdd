import {expect} from 'chai';
import {fromJS, Map} from 'immutable';
import reduce from '../src/reduce';

describe('reduce', () => {
  it('reduces to a default state', () => {
    const action = {type: 'LOAD_MOVIES', movies: ['Trainspotting']};
    const nextState = reduce(undefined, action);

    expect(nextState).to.equal(fromJS({
      movies: ['Trainspotting']
    }));
  });

  it('reduces LOAD_MOVIES', () => {
    const state = Map();
    const action = {type: 'LOAD_MOVIES', movies: ['trainspotting']};
    const nextState = reduce(state, action);

    expect(nextState).to.equal(
      fromJS({movies: ['trainspotting']})
    );
  });

  it('reduces NEXT', () => {
    const state = fromJS({movies: ['trainspotting', '28 days later']});
    const action = {type: 'NEXT'};
    const nextState = reduce(state, action);

    expect(nextState).to.equal(
      fromJS({
        vote: {pair: ['trainspotting', '28 days later']},
        movies: []
      })
    );
  });

  it('reduces VOTE', () => {
    const state = fromJS({
      vote: {pair: ['trainspotting', '28 days later']},
      movies: []
    });

    const action = {type: 'VOTE', movie: 'trainspotting'};
    const nextState = reduce(state, action);

    expect(nextState).to.equal(
      fromJS({
        vote: {
          pair: ['trainspotting', '28 days later'],
          tally: {'trainspotting': 1}
        },
        movies: []
      })
    );
  });

  it('can be used as reducer', () => {
    const actions = [
      {type: 'LOAD_MOVIES', movies: ['trainspotting', '28 days later']},
      {type: 'NEXT'},
      {type: 'VOTE', movie: 'trainspotting'},
      {type: 'VOTE', movie: '28 Days Later'},
      {type: 'VOTE', movie: 'trainspotting'},
      {type: 'NEXT'}
    ];

    const finalState = actions.reduce(reduce, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'trainspotting'
    }));
  });
});
