import React from 'react';
import FacebookLogin from 'react-facebook-login';

export default class FacebookButton extends React.Component {




  render() {
    let fbContent;

    if (this.props.facebook.isLoggedIn) {
      fbContent = (
        <React.Fragment>
              <div className="p-2">
                <div className="row">
                  <div className="col-12 text-center">
                    <img className="round-img border border-shadow" src={this.props.facebook.picture} alt={this.props.facebook.name} />
                  </div>
                </div>
                <div className='row'>
                  <div className="col-12 text-center">
                    <h6 className="mt-3">Signed-In As:<br/>
                    <strong>{this.props.facebook.userDetails.firstName} {this.props.facebook.userDetails.lastName}</strong></h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    <button type="button" className="btn bts-orange-bg" onClick={()=> {this.props.toggleLoggedIn(false); this.props.continueAsGuest()}}>
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
                autoLoad={true}
                fields="name,email,picture"
                state="randomstring"
                //onClick={this.componentClicked}
                callback={this.props.responseFacebook}
                //cssClass="my-facebook-button-class"
                icon="fab fa-facebook-square"
              />
            </div>
          </div>
          <div className="row p-2">
            <div className='col-12 text-center'>
              <button type="button" className="btn bts-orange-bg"
                onClick={()=> {this.props.toggleLoggedIn(false); this.props.profileClick()}}>
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
