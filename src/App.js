import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import FollowingPage from './containers/FollowingPage/FollowingPage'
import ProfilePage from './containers/ProfilePage/ProfilePage'
import Login from './containers/Login/Login'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { loadUser } from './store/actions/authActions'
import WhitePage from './components/WhitePage/WhitePage';


class App extends Component {

  componentDidMount = () => {
    //dispatch loadUser
    this.props.onLoadUser()
  }

  render() {
    let firstPage = <WhitePage />
    if (this.props.isAuthenticated && this.props.user !== null) {
      firstPage = <Layout />
    } else if (this.props.isAuthenticated === false) {
      firstPage = <Login />
    }

    return (
      <div>
        {firstPage}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // isAuthenticated: state.auth.token !== null
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLoadUser: () => dispatch(loadUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
