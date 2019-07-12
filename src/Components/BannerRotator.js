import React from 'react'
import '../App.css';
import banner from '../Images/banners/bts-planning-is-time-travel-2018-fb-cover.jpg'

const BannerRotator = (props) => {
  return (
    <div className='banner px-2 mr-2 mb-4'>
      {props.displayShow ? '' :
        <div>
          <img src={banner} className="img-fluid" alt="bus to show red rocks planning is time travel" />
          <div className='row mx-auto '>
            <div className='col-6 border'>
              <div className='row'>
                <div className="conactText m-1">Reservation Support:
                  <br/>reservations@bustoshow.org
                </div>
              </div>
            </div>
            <div className='col-6 border'>
              <div className='row'>
                <div className="conactText m-1">Private Events & Charters:
                  <br/>parties@bustoshow.org
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>


  )
}

export default BannerRotator;
