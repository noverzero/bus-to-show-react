import React from 'react'
import '../App.css';
import Event from './Event'
import logo from '../Images/Logos/bts-logo-orange.png'

const Events = (props) => {

  return (
    <div className='Events'>
      <div className='container'>

        <h1>Events</h1>
        <div className="list-group">
          <div className="list-group-item">
            <div className="row">
              <div className="col-md-6">Event</div>
              <div className="col-md-4">Location</div>
              <div className="col-md-2">Date</div>
            </div>
          </div>
          <ul className="list-group">

            <Event
              events={props.events}
              eventTitle={props.events.title} 
              eventExpandClick={props.eventExpandClick}/>
      </ul>

        </div>
      </div>
    </div>


  )
}

export default Events;
