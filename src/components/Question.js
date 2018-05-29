import React, { Component } from 'react'
import {connect} from 'react-redux'
import Login from './Login'
import {Link} from 'react-router-dom'

class Question extends Component {

    componentDidMount() {
    }

    vote(e, choice) {
        e.preventDefault()
        //alert("Choice: " + choice)
        const btn1 = document.getElementById('btn-choice-1');
        const btn2 = document.getElementById('btn-choice-2');
        btn1.className = 'invisible'
        btn2.className = 'invisible'

        const highlight = 'box-choice-' + choice
        document.getElementById(highlight).className = 'box-highlight'

    }

    render() {

        const {authedUser, question, users, isAnsweredByCurrent} = this.props
        console.log("Question: ", question)
        
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
                            <b>You answered</b>
                            :
                            <div className="jumbotron text-center">
                                <div className="h1">Would You Rather?</div>

                                <div><img src={users[question.author].avatarURL} className="img-thumbnail" /></div>
                                <div className="row">

                                    <div className="col h3 choice-box rounded" id="box-choice-1">
                                        <div className="font-weight-bold">A</div>
                                        <div className="h4">{question.optionOne.text}</div>
                                        <button className="btn btn-success" onClick={(e) => this.vote(e, 1)} id="btn-choice-1">Select this</button>
                                    </div>
                                    <div className="col h3 choice-box rounded" id="box-choice-2">
                                        <div className="font-weight-bold">B</div>
                                        <div className="h4">{question.optionTwo.text}</div>
                                        <button className="btn btn-success" onClick={(e) => this.vote(e, 2)}  id="btn-choice-2">Select this</button>
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
    const question = questions[question_id]
    return {
        authedUser,
        users,
        question,
        isAnsweredByCurrent: question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
    }
}

export default connect(mapStateToProps)(Question)

