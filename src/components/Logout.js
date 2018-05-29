import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import {Redirect} from 'react-router-dom'

class Logout extends Component {

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(setAuthedUser(0))
    }

    render() {
        return <Redirect to='/' />
    }
}

function mapStateToProps ({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Logout)

