import React, {Component, Fragment} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux"
import LoadingBar from 'react-redux-loading'

class Nav extends Component {

    render () {
        const {authedUser, users} = this.props

        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink className='navbar-brand' to='/' exact>
                        Home
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                            {authedUser !== 0
                                ? 
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <NavLink className='nav-link' to='/add' exact>
                                            Add
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className='nav-link' to='/leaderboard' exact>
                                            Leaderboard
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className='nav-link' to='/logout' exact>
                                            {users[authedUser].name} Logout
                                        </NavLink>
                                    </li>
                                </ul>
                                :
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className='nav-link' to='/login' exact>
                                            Login
                                        </NavLink>
                                    </li>
                                </ul>
                            }
                    </div>
                </nav>
                <LoadingBar />
            </Fragment>
        )}
}

function mapStateToProps({authedUser, users}) {
	return {
		users,
		authedUser
	}
}

export default connect(mapStateToProps)(Nav)
