// action types
const INIT_COMMENTS = 'INIT_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const AFTER_DELETE_COMMENT = 'AFTER_DELETE_COMMENT';
export default (state, action) => {
    if (!state) {
        state = {
            comments: []
        }
    }
    switch (action.type) {
        case INIT_COMMENTS:
            return {
                comments: action.comments
            }
        case ADD_COMMENT:
            return {
                comments: [...state.comments, action.comment]
            }
        case DELETE_COMMENT: 
            return {
                comments: [
                    ...state.comments.slice(0, action.commentIndex),
                    ...state.comments.slice(action.commentIndex + 1)
                ]
            }
        case AFTER_DELETE_COMMENT:
            return {
                comments: [
                    ...state.comments,
                    action.comment
                ]
            }
        default:
            return state
    }
}
// action creators
export const initComments = (comments) => {
    return { type: INIT_COMMENTS, comments }
}
export const addComment = (comment) => {
    return { type: ADD_COMMENT, comment }
}

export const deleteComment = (commentIndex) => {
    return { type: DELETE_COMMENT, commentIndex }
}

export const afterDeleteComment = (comment) => {
    return { type: AFTER_DELETE_COMMENT, comment }
}