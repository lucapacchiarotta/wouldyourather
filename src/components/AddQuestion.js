import React, { Component } from 'react'
import {connect} from 'react-redux'
import Login from './Login'
import {handleAddQuestion} from '../actions/questions'
import {handleAddUserQuestion} from '../actions/users'
import {Redirect} from 'react-router-dom'
import {showLoading,hideLoading} from "react-redux-loading"

class AddQuestion extends Component {

    state = {
        boxClasses: ['alert', 'alert-danger', 'd-none'],
        redirectToHome: false
    }

    handleSubmit = (e) => {
        const {dispatch} = this.props
        const {boxClasses} = this.state
        const {authedUser} = this.props

        e.preventDefault()

        boxClasses.pop()
        boxClasses.push('d-none')

        const optA = document.getElementById('option-a').value.trim()
        const optB = document.getElementById('option-b').value.trim()

        if (optA === '' || optB === '') {
            boxClasses.pop()
            boxClasses.push('d-block')

            this.setState({
                boxClasses
            })

            return false;
        } else {
            const question = {
                optionOneText: optA, 
                optionTwoText: optB
            }
        
            dispatch(showLoading())
            dispatch(handleAddQuestion(
                question, 
                (question) => {
                    dispatch(handleAddUserQuestion(
                        authedUser, 
                        question.id, 
                        () => {
                            dispatch(hideLoading())
                        }))

                    this.setState({
                        redirectToHome: true
                    })
                }
            ))

            return true
        }
    }

    render() {

        const {authedUser} = this.props

        if (this.state.redirectToHome === true) {
            return <Redirect to='/' />
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
                            <form onSubmit={this.handleSubmit} >
                                <div className="section">ADD new question</div>
                                <div className="jumbotron text-center">
                                    <div className="h1">Would You Rather?</div>

                                    <div className="row">
                                        <div className="col h4 choice-box rounded" id="box-choice-1">
                                            <div className="font-weight-bold">A</div>
                                            <div>
                                                <textarea id="option-a" className="box-insert-choice rounded" placeholder="Insert your option A"></textarea>
                                            </div>
                                        </div>
                                        <div className="col h3 choice-box rounded" id="box-choice-2">
                                            <div className="font-weight-bold">B</div>
                                            <div>
                                                <textarea id="option-b" className="box-insert-choice rounded" placeholder="Insert your option B"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <input type="submit" value="Add Poll" className="btn btn-success" />
                                        </div>
                                    </div>
                                </div>
                                <div className={this.state.boxClasses.join(' ')} id="alertBox">
                                    You need to inserto option A and option B
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(AddQuestion)

