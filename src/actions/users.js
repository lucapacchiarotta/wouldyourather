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

export function addUserAnswer(authedUser, qid, choice) {
    return {
        type: ADD_USER_ANSWER,
        authedUser,
        qid,
        choice
    }
}

export function handleAddUserQuestion(authedUser, qid, cb = () => {}) {
    return (dispatch) => {
        return dispatch(addUserQuestion(authedUser, qid, cb()))
    }
}

export function handleAddUserAnswer(question_id, choice, cb = () => {}) {
    return (dispatch, getState) => {
        const {authedUser} = getState()
        return dispatch(addUserAnswer(authedUser, question_id, choice, cb()))
    }
}