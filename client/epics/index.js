import { combineEpics } from 'redux-observable';
export const rootEpics= action$ => 
    action$.ofType('ADD_COMMENT')
        .delay(10000)
        .mapTo({ type: 'ADD_COMMENTS' });
