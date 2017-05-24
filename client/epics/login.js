import { combineEpics } from 'redux-observable';
export const signInEpics= action$ => 
    action$.ofType('SIGN_IN')
        .delay(3000)
        .mergeMap(action => (
            fetch('/api/user/signInOnce')
                .then((response) => {
                    return response.json()
                }).then((user) => {
                    return {
                        type: 'SIGN_IN_SUCCESS',
                        result: user
                    }  
                }).catch(() => {
                    return {
                        type: 'SIGN_IN_FAIL'
                    }
                })
            )
        )
export const signOutEpics = action$ => 
    action$.ofType('SIGN_OUT')
        .delay(3000)
        .mapTo({ type: 'SIGN_OUT_SUCCESS' })
export default combineEpics(
    signInEpics,
    signOutEpics
)
