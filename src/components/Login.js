import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import {Redirect} from 'react-router-dom'

class Login extends Component {

    state = {
        logged: false,
        boxClasses: ['alert', 'alert-danger', 'd-none']
    }

    handleSubmit = (e) => {
        const {dispatch} = this.props
        e.preventDefault()
        
        if (this.userId.value === '0') {
            const {boxClasses} = this.state
            boxClasses.pop()
            boxClasses.push('d-block')

            this.setState({
                boxClasses
            })
            
            return false
        } else {
            dispatch(setAuthedUser(this.userId.value))
        
            this.setState({
                logged: true
            })

            return true
        }
    }

    render() {
        const {users} = this.props
        const {logged} = this.state

        if (logged === true) {
            return <Redirect to='/' />
        }

        const formStyle = {
            padding: '10px 0'
        }
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                    <div className="section">Login</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <form onSubmit={this.handleSubmit} style={formStyle}>
                            <div className="login-box center">
                                <div>
                                    <select  
                                        ref={(input) => this.userId = input}
                                        className="form-control">
                                        <option value="0">Select user</option>
                                        {Object.keys(users).map((id) => (
                                            <option key={id} value={id}>{users[id].name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className={this.state.boxClasses.join(' ')} id="alertBox">
                            You need to select an user
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({users}) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Login)

