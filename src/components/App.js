import React, {Component, Fragment} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {handleInitialData} from '../actions/shared'
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard'
import Login from './Login'
import Logout from './Logout'
import Leaderboard from './Leaderboard'
import AddQuestion from './AddQuestion'
import Nav from './Nav'
import Question from './Question';

class App extends Component {

    componentDidMount() {
        const {dispatch, loading} = this.props
        if (loading === true) {
            dispatch(handleInitialData())
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    {this.props.loading === true
                        ? 
                        <div>
                            <LoadingBar />
                            App is loading data.. please wait
                        </div>
                        :
                        <div className='container'>
                            <Nav />
                            <Route path='/' exact component={Dashboard} />
                            <Route path='/add' exact component={AddQuestion} />
                            <Route path='/login' exact component={Login} />
                            <Route path='/leaderboard' exact component={Leaderboard} />
                            <Route path='/questions/:question_id' exact component={Question} />
                            <Route path='/logout' exact component={Logout} />
                        </div>
                    }
                </Fragment>
            </BrowserRouter>
        );
    }
}

function mapStateToProps ({authedUser, questions, users}) {
    return {
        loading: (authedUser === null && authedUser !== 0),
        authedUser
    }
}
    
export default connect(mapStateToProps)(App) 