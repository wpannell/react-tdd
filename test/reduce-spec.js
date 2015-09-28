import {expect} from 'chai';
import {fromJS, Map} from 'immutable';
import reduce from '../src/reduce';

describe('reduce', () => {
  it('reduces LOAD_MOVIES', () => {
    const firstState = Map();
    const action = {type: 'LOAD_MOVIES', movies: ['trainspotting']};
    const nextState = reduce(firstState, action);

    expect(nextState).to.equal(
      fromJS({movies: ['trainspotting']})
    );
  });

  it('reduces NEXT', () => {
    const firstState = fromJS({movies: ['trainspotting', '28 days later']});
    const action = {type: 'NEXT'};
    const nextState = reduce(firstState, action);

    expect(nextState).to.equal(
      fromJS({
        vote: {pair: ['trainspotting', '28 days later']},
        movies: []
      })
    );
  });

  it('reduces VOTE', () => {
    const firstState = fromJS({movies: ['trainspotting', '28 days later']});
    const action = {type: 'NEXT'};
    const nextState = reduce(firstState, action);

    expect(nextState).to.equal(
      fromJS({
        vote: {pair: ['trainspotting', '28 days later']},
        movies: []
      })
    );
  });
});
