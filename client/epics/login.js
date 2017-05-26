import { combineEpics } from 'redux-observable';
import axios from 'axios';
export const signInEpics= action$ => 
    action$.ofType('SIGN_IN')
        .delay(3000)
        .mergeMap(action => (
            axios.get('/api/user/signInOnce')
                .then((res) => {
                    return {
                        type: 'SIGN_IN_SUCCESS',
                        result: res.data
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
        .mergeMap(action => (
            axios.get('api/user/signOut')
                .then((res) => {
                    return {
                        type: 'SIGN_OUT_SUCCESS'
                    }
                }).catch(() => {
                    return {
                        type: 'SIGN_OUT_FAIL'
                    }
                })
        ))
export default combineEpics(
    signInEpics,
    signOutEpics
)
