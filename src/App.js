import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactGA from 'react-ga';
import { sha256 } from 'js-sha256';


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
  
  const [assignedParties, setAssignedParties] = useState([]);
  const [displayDetailCartView, setDisplayDetailCartView] = useState(false);
  const [displayEditReservation, setDisplayEditReservation] = useState(false);
  const [displayExternalShowDetails, setDisplayExternalShowDetails] = useState(false);
  const [displayFuture, setDisplayFuture] = useState(false);
  const [displayHeader, setDisplayHeader] = useState(true);
  const [displayLoginView, setDisplayLoginView] = useState(false);
  const [displayPast, setDisplayPast] = useState(false);
  const [displayQuantity, setDisplayQuantity] = useState(false);
  const [displayReservationDetail, setDisplayReservationDetail] = useState(false);
  const [displayReservations, setDisplayReservations] = useState(false);
  const [displayShow, setDisplayShow] = useState(null);
  const [displayShowDetails, setDisplayShowDetails] = useState(null);
  const [displayShowList, setDisplayShowList] = useState(null);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [displayUserReservationSummary, setDisplayUserReservationSummary] = useState(false);
  const [filterString, setFilterString] = useState('')
  

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotForm, setShowForgotForm] = useState(false);


  const [isVerified, setIsVerified] = useState(false);
  const [isCalled, setIsCalled] = useState(false);
  const [registerResponse, setRegisterResponse] = useState({});
  const [reservationDetail, setReservationDetail] = useState(null);
  const [pickupPartyId, setPickupPartyId] = useState(null);
  const [pickupLocations, setPickupLocations] = useState([]);
  const [userReservations, setUserReservations] = useState([]);
  const [userShows, setUserShows] = useState([]);


  const getPickupParties = async (eventId) => {
    const response = await fetch(`${fetchUrl}/pickup_parties/findParties`, {
      method: 'PATCH',
      body: JSON.stringify({ eventId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    let result = await response.json()
    result = result.sort( (a, b) => {
      return a.id - b.id
    })
    return result
  }

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

  const logout = () => {
    this.toggleLoggedIn(false);
    this.profileClick()
  }



  const profileClick = () => {
    setDisplayLoginView((prevState) => !prevState);

    if (adminView) {
      setAdminView(false);
    }
  };

  const requestRegistration = async (request) => {
    const password = sha256(request.password)
    const usersInfo = await fetch(`${fetchUrl}/users`, {
      method: 'POST',
      body: JSON.stringify({
          firstName: request.firstName,
          lastName: request.lastName,
          email: request.email,
          hshPwd: password
      }),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    const userObj = await usersInfo.json()
    setRegisterResponse(userObj)
  }

  const showsExpandClick = async (event) => {
    //immediately clear previously selected pickupPartyId from State.
    setPickupPartyId(null);
 
    const clickedShow = userShows.find(show => (parseInt(show.id) === parseInt(event.target.id)))
    if(clickedShow.external){
      setDisplayShowDetails(false);
      setDisplayExternalShowDetails(true);
      setDisplayShowList(false);
      setDisplayShow(clickedShow);
    } else {
      const assignedPickupParties = await this.getPickupParties(clickedShow.id)
      const currentPickups = assignedPickupParties.map(party => party.pickupLocationId)
      const pickupLocations = pickupLocations.filter(loc => currentPickups.includes(loc.id))

      assignedPickupParties.map(party => pickupLocations.map(location => {
        if (location.id === party.pickupLocationId) {
          party.LocationName = location.locationName
        }
      }))

      //set initial state of show details view
      setDisplayQuantity(false);
      setDisplayDetailCartView(true);
      setDisplaySuccess(false);
      setDisplayShowDetails(true)
      setDisplayExternalShowDetails(false);
      setDisplayShow(clickedShow);
      setAssignedParties(assignedPickupParties);
      setDisplayShowList(false);
      if (document.querySelector('#departureOption')) {
        document.querySelector('#departureOption').value = "Select a Departure Option..."
      }
    }
  }

  const toggleForgot = () => {
    const showForgotForm = !showForgotForm;
    setShowForgotForm(showForgotForm);
  }  

  const toggleLoggedIn = (boolean) => {
    console.log('toggleLoggedIn clicked ---' , boolean);
    if (boolean === false){
      setBtsUser({
          isLoggedIn: false,
          userID: '',
          name: '',
          email:'',
          picture:'',
          userDetails: {
            isAdmin: false,
            isStaff: false,
            isDriver: false,
          },
        })
        localStorage.setItem('jwt', '')
      } else {
        setBtsUser(
          {...btsUser,
            isLoggedIn: boolean,
          }
        )
      }
    }
    
  const toggleRegister = () => {
    setShowRegisterForm(!showRegisterForm);  
  }

  const toggleReservationView = (e) => {
    getReservations();
    setDisplayFuture(true);
    setDisplayPast(false);
    setDisplayUserReservationSummary(true);
    if(!reservationDetail){
      setDisplayReservations(!displayReservations);
    }

    if(e.target.id==='dashboard' || e.target.id==='summary'){
      setDisplayReservationDetail(false);
      setReservationDetail(null);
      setDisplayUserReservationSummary(false);
    }
    if(e.target.id === 'detail' || e.target.id === 'edit'){
      setDisplayReservations(true);
      setDisplayEditReservation(false);
      setDisplayReservationDetail(true);
      setDisplayUserReservationSummary(false);
    }
  }

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

    useEffect(() => {
      const getPickupLocations = async () => {
        const pickups =  await fetch(`${fetchUrl}/pickup_locations`).json()
        setPickupLocations(pickups)
      } 
      getPickupLocations();
    }, []);
  };


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
          <Route exact path="/login" element={
            <LoginView
              displayReservationDetail={displayReservationDetail}
              displayReservations={displayReservations}
              toggleLoggedIn={toggleLoggedIn}
              logout={logout}
              showRegisterForm={showRegisterForm}
              toggleRegister={toggleRegister}
              requestRegistration={requestRegistration}
              registerResponse={registerResponse}
              showForgotForm={showForgotForm}
              toggleForgot={toggleForgot}
              profileClick={profileClick}
              toggleReservationView={toggleReservationView}
              userReservations={userReservations}
              displayShow={displayShow}
              filterString={filterString}
              showsExpandClick={showsExpandClick}
              responseLogin={this.responseLogin}
              continueAsGuest={this.continueAsGuest}
              btsUser={this.state.btsUser}
              toggleAdminView={this.toggleAdminView}
              expandReservationDetailsClick={this.expandReservationDetailsClick}
              reservationDetail={this.state.reservationDetail}
              toggleFuturePast={this.toggleFuturePast}
              displayFuture={this.state.displayFuture}
              displayPast={this.state.displayPast}
              getEventDetails={this.getEventDetails}
              displayUserReservationSummary={this.state.displayUserReservationSummary}
              toggleEditReservation={this.toggleEditReservation}
              displayEditReservation={this.state.displayEditReservation}
              reservationEditField={this.reservationEditField}
              submitReservationForm={this.submitReservationForm}
              reservationToEditId={this.state.reservationToEditId}
              displayEditSuccess={this.state.displayEditSuccess}
              toggleEditSuccess={this.toggleEditSuccess}
          />
          } />
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
