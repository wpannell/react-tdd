import {List} from 'immutable';

export function loadEntriesInto(state, entries) {
  return state.set('entries', new List(entries));
}
