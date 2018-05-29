import React, { Component } from 'react'
import {connect} from 'react-redux'
import Login from './Login'

class Leaderboard extends Component {

    render() {

        const {authedUser, questions} = this.props
        
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
        questions
    }
}

export default connect(mapStateToProps)(Leaderboard)

