//ToDo: 
//1. Add Popover promoting account benefits


// Packages
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import env from "react-dotenv";

// Styling
import './App.css';

// Components
import ReactGA from 'react-ga';
import MembershipsPage from './Pages/MembershipsPage'
import LayoutPage from './Pages/LayoutPage';
import VerifyPage from './Pages/VerifyPage';
import ResetPage from './Pages/ResetPage';
ReactGA.initialize('UA-17782248-2');
ReactGA.pageview('/app');

const fetchUrl = `${process.env.REACT_APP_API_URL}`
const verifyEmailUrl = `${fetchUrl}/users/confirm-email`

class App extends Component {
  state ={
    isVerified: false,
    isCalled: false
  }
  
  verifyEmail = async (token) => {
    if (this.state.isCalled === true) return
    const isCalled = true
    const response = await fetch(`${verifyEmailUrl}/${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    const isVerified = result ? true : false;
    this.setState({
      isVerified: isVerified,
      isCalled: isCalled
    })
    // setIsCalled(true);
    // setIsVerified(response ? true : false)
    return
}

  render() {
    return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LayoutPage} />
          <Route exact path="/memberships" component={MembershipsPage} />
          <Route path="/verify/:token" component={(props) => 
            <VerifyPage 
              verifyEmail={this.verifyEmail}
              isVerified={this.state.isVerified}
              isCalled={this.state.isCalled}
              {...props}
            />}
          />
          <Route path="/reset/:token" component={(props) => 
            <ResetPage 
              verifyEmail={this.verifyEmail}
              isVerified={this.state.isVerified}
              isCalled={this.state.isCalled}
              {...props}
            />}
          />
          <Route component={LayoutPage} />

        </Switch>
      </div>
    </Router>
    )
  }
}

export default App;
