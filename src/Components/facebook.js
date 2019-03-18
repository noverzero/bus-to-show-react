import React from 'react';
import FacebookLogin from 'react-facebook-login';

export default class FacebookButton extends React.Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email:'',
        picture:'',
        userDetails: {},
    }

    responseFacebook = async (response) => {
        this.setState({
            //isLoggedIn: true,
            userID: response.id,
            name: response.name,
            email:response.email,
            picture:response.picture.data.url,
        })
         this.props.toggleLoggedIn(true)


         const usersInfo = await fetch('http://localhost:3000/users', {
        //const usersInfo = await fetch('https://something-innocuous.herokuapp.com/users', {
                method: 'POST',
                body: JSON.stringify({
                    firstName: response.name.split(" ")[0],
                    lastName: response.name.split(" ")[1],
                    email: response.email,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        const userObj = await usersInfo.json()
        const newState = { ...this.State }
        newState.userDetails = userObj
        this.setState({
          userDetails: newState.userDetails
        })
        console.log('userObj response to work with', userObj)
        console.log('userDetails::::', this.state.userDetails)
        //this.props.getReservations(json.id)

    }

    componentClicked = () => {
    }



  render() {
    let fbContent;

    if (this.state.isLoggedIn || this.props.loggedIn) {
      fbContent = (
        <React.Fragment>
              <div className="p-2">
                <div className="row">
                  <div className="col-12 text-center">
                    <img className="round-img border border-shadow" src={this.state.picture} alt={this.state.name} />
                  </div>
                </div>
                <div className='row'>
                  <div className="col-12 text-center">
                    <h6 className="mt-3">Signed-In As:<br/>
                    <strong>{this.state.userDetails.firstName} {this.state.userDetails.lastName}</strong></h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    <button type="button" className="btn bts-orange-bg" onClick={()=> {this.props.toggleLoggedIn(false); this.setState({isLoggedIn: false, userDetails: {} })}}>
                      <strong>Log Out</strong>
                    </button>
                  </div>
                </div>
              </div>
        </React.Fragment>
      )
    } else {
      fbContent = (
        <div>
          <div className="row p-2">
            <div className='col-12 text-center'>
              <FacebookLogin
                appId="244004823142378"
                autoLoad={false}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
                //cssClass="my-facebook-button-class"
                icon="fab fa-facebook-square"
                 />
            </div>
          </div>
          <div className="row p-2">
            <div className='col-12 text-center'>
              <button type="button" className="btn bts-orange-bg"
                onClick={()=> {this.props.toggleLoggedIn(false); this.props.profileClick(); this.setState({isLoggedIn: false, userDetails: {}, })}}>
                <strong>Continue as Guest</strong>
              </button>
            </div>
          </div>
        </div>
      )
    }
    return (
      <React.Fragment>{fbContent}</React.Fragment>
    )
  }
}
