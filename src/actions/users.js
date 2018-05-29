import {saveUserQuestion} from '../utils/api'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function addUserQuestion(authedUser, qid) {
    return {
        type: ADD_USER_QUESTION,
        authedUser,
        qid
    }
}

export function addUserAnswer() {
    
}

export function handleAddUserQuestion(authedUser, qid, cb = () => {}) {
    return (dispatch) => {
        return dispatch(addUserQuestion(authedUser, qid, cb()))
    }
}

