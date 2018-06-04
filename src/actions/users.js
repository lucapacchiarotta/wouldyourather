import {RECEIVE_USERS} from './actionTypes'
import {ADD_USER_QUESTION} from './actionTypes'
import {ADD_USER_ANSWER} from './actionTypes'

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