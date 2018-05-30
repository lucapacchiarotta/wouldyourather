import {saveQuestion, saveQuestionAnswer} from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'
export const VOTE_QUESTION = 'VOTE_QUESTION'


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

export function saveAnswer(question) {
    return {
        type: SAVE_ANSWER,
        question
    }
}

export function voteQuestion(authedUser, qid, option) {
    return {
        type: VOTE_QUESTION,
        authedUser, 
        qid, 
        option
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

export function handleVoteQuestion(qid, option, cb = () => {}) {
    console.log("HVQ: qid: ", qid)
    return (dispatch, getState) => {
        const {authedUser} = getState()

        dispatch(voteQuestion(authedUser, qid, option))
        
        return saveQuestionAnswer(authedUser, qid, option)
            .then((result) => {
                console.log("Chiamo la cb. Result: ", result)
                cb()
            })
            .catch(() => {
                alert('There was an error. Try again.')
            })
      }
    
}