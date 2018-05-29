import {RECEIVE_QUESTIONS, SAVE_ANSWER, ADD_QUESTION} from '../actions/questions'

export default function questions (state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }

        case ADD_QUESTION:
            const {id} = action.question
            return {
                ...state,
                [id]: action.question
            }
        
        case SAVE_ANSWER:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    likes: action.hasLiked === true
                        ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
                        : state[action.id].likes.concat([action.authedUser])
                }
            }
        
        default:
            return state
    }
}