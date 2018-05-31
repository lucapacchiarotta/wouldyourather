import React, { Component } from 'react'
import {connect} from 'react-redux'
import Login from './Login'

class Leaderboard extends Component {

    render() {
        const {authedUser, users} = this.props

        let usersOrdered = Object.keys(users)
            .map((id) => {
                const numAnswers = Object.keys(users[id].answers).length
                const item = {
                    id: users[id].id,
                    name: users[id].name,
                    questions: users[id].questions.length,
                    answers: numAnswers,
                    avatarURL: users[id].avatarURL,
                    points: users[id].questions.length + numAnswers
                }

                return item
            })
            .sort((a, b) => b.points - a.points)
        
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
                            <div className="section">Laderboard</div>

                            {usersOrdered.map((item) => {                                
                                return (
                                    <div className="list-container" key={item.id}>
                                        <div className="row leaderboard-item-list rounded">
                                            <div className="col-2">
                                                <img src={item.avatarURL} className="img-thumbnail" />
                                            </div>
                                            <div className="col-10">
                                                <div className="author">{item.name}</div>
                                                <div className="text">Number of questions the user asked: {item.questions}</div>
                                                <div className="text">Number of questions the user answered: {item.answers}</div>
                                            </div>
                                        </div>
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

function mapStateToProps ({authedUser, users}) {
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)