import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactGA from 'react-ga';

// Pages
import StorePage from './Pages/StorePage';
import LayoutPage from './Pages/LayoutPage';
import VerifyPage from './Pages/VerifyPage';
import ResetPage from './Pages/ResetPage';

// Components
import Header from './Components/Header';
import LoginView from './Components/LoginView/LoginView';

ReactGA.initialize('UA-17782248-2');
ReactGA.pageview('/app');

const fetchUrl = `${process.env.REACT_APP_API_URL}`;
const verifyEmailUrl = `${fetchUrl}/users/confirm-email`;

const App = () => {
  const [adminView, setAdminView] = useState(false);
  const [btsUser, setBtsUser] = useState({
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: '',
    userDetails: {},
  });
  const [displayLoginView, setDisplayLoginView] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isCalled, setIsCalled] = useState(false);

  const getReservations = async () => {
    const userId = this.state.btsUser.userDetails.id
    if (userId) {
      const reservations = await fetch(`${fetchUrl}/orders/${userId}`)
      const userReservations = await reservations.json()
      const newState = { ...this.State }
      newState.userReservations = await userReservations
      await this.setState({ userReservations: newState.userReservations })
    }
  }
  
  const profileClick = () => {
    setDisplayLoginView((prevState) => !prevState);

    if (adminView) {
      setAdminView(false);
    }
  };

  const verifyEmail = async (token) => {
    if (isCalled === true) return;
    setIsCalled(true);

    const response = await fetch(`${verifyEmailUrl}/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    const verified = result ? true : false;
    setIsVerified(verified);
  };

  const displayHeader = true;

  return (
    <Router>
      <div>
        {displayHeader ? (
          <Header
            getReservations={getReservations}
            btsUser={btsUser}
            profileClick={profileClick}
            adminView={adminView}
          />
        ) : (
          ''
        )}
        <Routes>
          <Route exact path="/" element={<LayoutPage />} />
          <Route exact path="/login" element={<LoginView />} />
          <Route exact path="/store" element={<StorePage />} />
          <Route
            path="/verify/:token"
            element={(props) => (
              <VerifyPage
                verifyEmail={verifyEmail}
                isVerified={isVerified}
                isCalled={isCalled}
                {...props}
              />
            )}
          />
          <Route
            path="/reset/:token"
            element={(props) => (
              <ResetPage
                verifyEmail={verifyEmail}
                isVerified={isVerified}
                isCalled={isCalled}
                {...props}
              />
            )}
          />
          <Route element={<LayoutPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
