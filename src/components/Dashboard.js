import React, { Component } from 'react'
import {connect} from 'react-redux'
import Login from './Login'
import {Link} from 'react-router-dom'

const ANSWERED = 'ANSWERED'
const UNANSWERED = 'UNANSWERED'

class Dashboard extends Component {

    state = {
        showAnswered: false,
        unansweredClasses: ['btn', 'btn-success'],
        answeredClasses: ['btn', 'btn-standard']
    }

    handleView = (e, whatToShow) => {
        const {unansweredClasses, answeredClasses} = this.state

        unansweredClasses.pop()
        answeredClasses.pop()

        if (whatToShow === UNANSWERED) {
            unansweredClasses.push('btn-success')
            answeredClasses.push('btn-standard')
        } else if (whatToShow === ANSWERED) {
            answeredClasses.push('btn-success')
            unansweredClasses.push('btn-standard')
        }

        this.setState({
            showAnswered: whatToShow === ANSWERED ? true : false,
            answeredClasses,
            unansweredClasses
        })
    }

    render() {
        const {authedUser, questions, questionsIdOrdered} = this.props
        
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
                            <div className="section">DASHBOARD</div>
                            
                            <div className="buttons-container">
                                <button className={this.state.unansweredClasses.join(' ')} onClick={(e) => this.handleView(e, UNANSWERED)}>UNANSWERED</button>
                                <button className={this.state.answeredClasses.join(' ')} onClick={(e) => this.handleView(e, ANSWERED)}>ANSWERED</button>
                            </div>

                            {questionsIdOrdered.map((id) => {
                                const voted = questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.votes.includes(authedUser)

                                return (
                                    <div className="list-container" key={id}>
                                        {((voted && this.state.showAnswered) || (!voted  && !this.state.showAnswered)) && 
                                            <Link to={`/questions/${id}`} className='question-item-list rounded'>
                                                {((voted && this.state.showAnswered) || (!voted  && !this.state.showAnswered)) && 
                                                    <div className="dashboard-item-list">  
                                                        <div className="title">Would You Rather?</div>
                                                        <div className="text">Author: {questions[id].author}</div>
                                                        <div className="text">Option A: {questions[id].optionOne.text}</div>
                                                        <div className="text">Option B: {questions[id].optionTwo.text}</div>
                                                        <div className="text-small">Click to choose your answer</div>
                                                    </div>
                                                }
                                            </Link>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}) {
    return {
        authedUser,
        users,
        questions,
        questionsIdOrdered: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)