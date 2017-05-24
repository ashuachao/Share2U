// action types
const SIGN_IN = 'SIGN_IN';
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_FAIL = 'SIGN_IN_FAIL';
const SIGN_OUT = 'SIGN_OUT';
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
const SIGN_OUT_FAIL = 'SIGN_OUT_FAIL';
export default (state, action) => {
    if (!state) {
        state = {
            user: null,
            isAuthenticating_in: false,
            isAuthenticating_out: false,
            isAuthenticate_success: false,
            isAuthenticate_fail: false
        }
    }
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                isAuthenticating_in: true,
                isAuthenticate_success: false,
                isAuthenticate_fail: false
            }
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                user: action.result,
                isAuthenticating_in: true,
                isAuthenticate_success: true,
                isAuthenticate_fail: false
            }
        case SIGN_IN_FAIL:
            return {
                ...state,
                isAuthenticating_in: true,
                isAuthenticate_success: false,
                isAuthenticate_fail: true,
            }
        case SIGN_OUT:
            return {
                ...state,
                isAuthenticating_in: false,
                isAuthenticating_out: true,
                isAuthenticate_success: false,
                isAuthenticate_fail: false

            }
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                user: null,
                isAuthenticating_out: true,
                isAuthenticate_success: true,
                isAuthenticate_fail: false

            }
        case SIGN_OUT_FAIL:
            return {
                ...state,
                isAuthenticating_out: true,
                isAuthenticate_success: false,
                isAuthenticate_fail: true

            }
        default:
            return state
    }
}
// action creators
export const signIn = (user) => {
    return { type: SIGN_IN, user }
}
export const signOut = (user) => {
    return { type: SIGN_OUT, user }
}
