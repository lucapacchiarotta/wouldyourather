import React, { Component } from 'react'
import {connect} from 'react-redux'
import Login from './Login'
import {Link} from 'react-router-dom'
import {showLoading,hideLoading} from "react-redux-loading"
import {handleVoteQuestion} from '../actions/questions'
import {handleAddUserAnswer} from '../actions/users'

const OPTION_A = 'optionOne'
const OPTION_B = 'optionTwo'

class Question extends Component {

    vote(e, choice) {
        const {dispatch, question_id} = this.props
        const qid = question_id

        e.preventDefault()
        const btn1 = document.getElementById('btn-choice-1');
        const btn2 = document.getElementById('btn-choice-2');
        btn1.className = 'invisible'
        btn2.className = 'invisible'

        dispatch(handleVoteQuestion(
            question_id,
            choice, 
            () => {
                dispatch(handleAddUserAnswer(
                    question_id, 
                    choice,
                    () => {
                    })
                )
            }
        ))
    }

    render() {

        const {authedUser, users, questions, question_id} = this.props
        let itemFound = true
        if (!Object.keys(questions).includes(question_id)) {
            itemFound = false

            return (
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            {authedUser === 0 
                            ?   
                            <div className="col">
                                You need to be logged! 
                                <Login />
                            </div>
                            :
                            <div className="h4">404: Page not found</div>
                            }
                        </div>
                    </div>
                </div>
            )
        }

        const question = questions[question_id]
        const isAnsweredByCurrent = question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)

        let classesBoxOptOne = ['col h3 choice-box rounded']
        let classesBoxOptTwo = ['col h3 choice-box rounded']
        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length

        if (question.optionOne.votes.includes(authedUser)) {
            classesBoxOptOne = classesBoxOptOne.concat('border-success alert-success')
        }
        if (question.optionTwo.votes.includes(authedUser)) {
            classesBoxOptTwo = classesBoxOptTwo.concat('border-success alert-success')
        }

        return (
            <div className="container">
                <div className="row">
                    {authedUser === 0 
                        ?   
                        <div className="col">
                            You need to be logged! 
                            <Login />
                        </div>
                        :
                        <div className="col">
                            <div className="section">Question</div>
                            {isAnsweredByCurrent

                            ?
                            <div className="text-center">
                                <div className="h3">You answered</div>
                                <div className="row">
                                    <div className={classesBoxOptOne.join(' ')} id="box-choice-optionOne">
                                        <div className="font-weight-bold">A</div>
                                        <div className="h4">{question.optionOne.text}</div>
                                        <div className="h5"><span className="badge badge-light">{question.optionOne.votes.length}</span> votes received</div>
                                        <div className="h5"><span className="badge badge-light">{(question.optionOne.votes.length * 100 / totalVotes).toFixed(2)} %</span> votes received</div>
                                    </div>
                                    <div className={classesBoxOptTwo.join(' ')} id="box-choice-optionTwo">
                                        <div className="font-weight-bold">B</div>
                                        <div className="h4">{question.optionTwo.text}</div>
                                        <div className="h5"><span className="badge badge-light">{question.optionTwo.votes.length}</span> votes received</div>
                                        <div className="h5"><span className="badge badge-light">{(question.optionTwo.votes.length * 100 / totalVotes).toFixed(2)} %</span> votes received</div>
                                    </div>
                                </div>
                            </div>

                            :
                            <div className="text-center">
                                <div className="h1">Would You Rather?</div>
                                <div><img src={users[question.author].avatarURL} className="img-thumbnail" /></div>
                                <div className="row">
                                    <div className="col h3 choice-box rounded" id="box-choice-optionOne">
                                        <div className="font-weight-bold">A</div>
                                        <div className="h4">{question.optionOne.text}</div>
                                        <button className="btn btn-success" onClick={(e) => this.vote(e, OPTION_A)} id="btn-choice-1">Select this</button>
                                    </div>
                                    <div className="col h3 choice-box rounded" id="box-choice-optionTwo">
                                        <div className="font-weight-bold">B</div>
                                        <div className="h4">{question.optionTwo.text}</div>
                                        <button className="btn btn-success" onClick={(e) => this.vote(e, OPTION_B)}  id="btn-choice-2">Select this</button>
                                    </div>
                                </div>
                            </div>

                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, props) {
    const {question_id} = props.match.params
    
    return {
        authedUser,
        users,
        questions,
        question_id
    }
}

export default connect(mapStateToProps)(Question)

