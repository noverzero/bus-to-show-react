import React from 'react'
import '../App.css';
import logo from '../Images/Logos/bts-logo-orange.png'
import MediaQuery from 'react-responsive'

const SponsorBox = (props) => {


  return (
    <div className='SponsorBox container mt-2'>
    <MediaQuery minWidth={800}>
      <div className="row">
        <div className="col-md-6 col-centered offset-md-4">
          <img className='' src={logo} alt="bts-logo" width="125" />
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <p>
              Bus to Show was delivered to the present through intertemporal telepathic communication (ITC) from the future (13 years from now (the 5th year of the convergence)) as part of a strategy to implement systems in the past (present) designed to save the future (of existence) by reducing the impaired driving (preventing tragic disruptions in the trajectory of life energies embodied by future pivotal leaders) and fuel consumption  that results from events (acceleration of the consequences of climate change).  All you have to do be part of the solution, is ride the bus.
              <br />
              <br />
              Bus to Show is a Colorado Nonprofit Corporation with the ability to accept 501(c)(3) tax-exempt donations through its fiscal sponsor partnership with The Nowak Society.
            </p>

          </div>
        </div>
      </div>
    </MediaQuery>
    </div>


  )
}

export default SponsorBox;
