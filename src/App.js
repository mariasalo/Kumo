import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'
import './App.scss';
import Navigation from './shared/Navigation';
import Home from './views/Home'
import Add from './views/Add'
import Update from './views/Update';
import Posts from './views/Posts';
import Reservations from './views/Reservations';
import Profile from './views/Profile';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './views/actions/index';

// import Footer from './shared/Footer';

//Tässä asetetaan routet kaikille sovelluksen elementeille:
class App extends Component {

  // Haetaan kaikki data tietokannasta (render GetAllItems komponentissa, kutsutaan Homessa)

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/" render={
          (props) => <Home {...props} />
        } />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/Posts" component={Posts} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Add" component={Add} />
        {/* <Redirect to="/" /> */}
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/" render={
            (props) => <Home {...props} />
          } />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/Add" component={Add} />
          <Route path="/Posts" component={Posts} />
          <Route path="/Reservations" component={Reservations} />
          <Route path="/Profile" component={Profile} />
          <Route exact path="/Update/:id" component={Update} />
          {/* <Redirect to="/" /> */}
        </Switch>
      );
    }

    return (
      <div className="App">
        <Navigation />
        <div className="container">
          {routes}
          {/* <Home items={this.state.items} errorMsg={this.state.errorMsg} /> */}
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));