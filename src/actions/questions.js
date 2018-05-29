import {saveQuestion} from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'


export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(question, cb) {
    
    return (dispatch, getState) => {
        const {authedUser} = getState()
        question.author = authedUser

        return saveQuestion(question)
            .then((question) => 
                dispatch(addQuestion(question)))
            .then((result) => 
                cb(result.question))
            .catch(() => {
                alert('There was an error on hanldeAddQuestion. Try again.')
            })
      }
}

export function saveAnswer(question) {
    return {
        type: SAVE_ANSWER,
        question
    }
}


export function handleSaveAnswer(question) {
    return (dispatch) => {
        return saveQuestion(question)
            .then((question) => {
                dispatch(saveAnswer(question))
            })
            .catch(() => {
                alert('There was an error. Try again.')
            })
      }
}

