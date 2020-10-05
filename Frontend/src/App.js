import React from 'react';
import Cookies from 'js-cookie';
import Navbar from './components/Navbar'
import Home from './components/Home'
import {BaseProvider, LightTheme} from 'baseui';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import Login from './components/Login'
import SignUp from './components/SignUp'
import SavedTrips from './components/SavedTrips'
import './style/App.css';
import './style/Map.css';
import './style/PopupBars.css';
import './style/SavedTrips.css';
import Map from './components/Map'
const engine = new Styletron();

export default class App extends React.Component {

/*ToDo Refactor
1. Clean up functions, spacing, and 
2. Add profile state logic for edit and create new component for profile. 
3. error handling for user credentials and cookie expiry missing (component mount) like modal?
4. Add validation
*/

state = {
  jwt: "",
  loggedIn: false,
  currentUser: null
}

componentDidMount = () => {
  if(Cookies.get('jwt')){
    this.setState({ 
        jwt: this.state.jwt = Cookies.get('jwt'),
        loggedIn: true
    }, () => this.getCurrentUser(this.state.jwt))
  }
}

getCurrentUser(token) {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }

  fetch('http://localhost:3001/profile', config)
  .then(response => response.json())
  .then(user => {
    this.setState({
      currentUser: user
    })
  })
}

saveUser = (userObj) => {
    this.setState({
      currentUser: userObj,
      loggedIn: true
    })
}

logOut = () => {
  console.log("I am being hit")
  Cookies.remove('jwt')   
  this.setState({loggedIn: false})
}

saveTrips = (tripObj) => {
  console.log(tripObj)
}

  render() {
    return (
    
      <Router>
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>
          <Navbar 
          currentUser={this.state.currentUser}
          logout={this.logOut}
          loggedIn={this.state.loggedIn}
          />    
          </BaseProvider>
        <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/map" render={() => <Map currentUser={this.state.currentUser} token={this.state.jwt}/>} saveTrips={this.saveTrips} />
                <Route exact path="/login" render={() => <Login saveUser={this.saveUser}/>} />
                <Route exact path="/signup" render={() => <SignUp saveUser={this.saveUser} />} />
                <Route exact path="/savedtrips" render={() => <SavedTrips currentUser={this.state.currentUser} token={this.state.jwt} />} />
        </Switch>
      </StyletronProvider>
      </Router>
    );
  }
}


 
