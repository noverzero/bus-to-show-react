import React from 'react'
import '../../App.css';
import logo from '../../Images/Logos/bts-logo-gray.png'
import MediaQuery from 'react-responsive';
import moment from 'moment'

const ShowDetailView = (props) => {

  let show;
  let headlinerBio
  if (props.displayShow) {
    show = props.displayShow
    if(show.headlinerBio){
    headlinerBio = show.headlinerBio.split('<a')[0]
    }
  }



  let basePrice;
  if (props.pickupPartyId) {
    basePrice = props.assignedParties.find(party => parseInt(party.id) === parseInt(props.pickupPartyId)).partyPrice.toFixed(2)
  }

  return (
    <div className='ShowDetailView'>
      {/* Desktop View */}
      <MediaQuery minWidth={8}>
        {props.displayShow && !props.displayCart ?
          <div className={`content-section-details ${props.displayBorder ? 'add-border' : 'remove-border'}`}>
            <h3>Bus Rides to {show.headliner}</h3>
            <h4>{moment(show.date, "MM-DD-YYYY").format("dddd")} - {show.date} at {show.venue.split(' Amphitheatre')[0]} (and back)</h4>
            <div className="list-group">
              <div className="list-group-item">
                <div className='row container justify-content-center'>
                  <MediaQuery minWidth={800}>
                  <div className="col-7 artist-info bio-font">
                    {show.headlinerBio ? headlinerBio :
                      <div>
                        <div className='row'>
                          <div className="col-md-12">
                            {<p>
                              We came from the future to save the future by reducing the impaired driving and fuel consumption that results from events.  All you have to do is ride.
                              <br />
                              <br />
                              Bus to Show is a Colorado Nonprofit Corporation with the ability to accept 501(c)(3) tax-exempt donations through its fiscal sponsor partnership with The Nowak Society.
                            </p>
                            }
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 offset-md-1 mt-3 no-info-logo">
                            <img src={logo} width="233" height="100" className="d-inline-block align-top" alt="bts-logo" />
                          </div>
                        </div>
                      </div>}
                  </div>
                </MediaQuery>
                  <div className="col-5 artist-image">
                    <div className="row bts-logo-flex">
                      {show.headlinerImgLink ?
                        <img className='headliner-img' src={show.headlinerImgLink} alt="headliner" />
                        :
                        <img src={logo} alt="bts-logo" className='bts-logo-sDV' />
                      }
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-7">
                    <div className='mt-2'>Departure Options</div>
                    <form className="needs-validation">
                      <div className="form-group">
                        <select id="departureOption" className={`custom-select mt-2 ${props.displayQuantity ? 'is-valid' : ''}`} onChange={props.selectPickupLocationId} required>
                          <option id="select" value="Select a Departure Option..." >Select a Departure Option...</option>
                          {props.assignedParties ?
                            props.assignedParties.map(location => {
                              return (
                                <option
                                  key={location.id}
                                  id={location.id}
                                  value={location.id}>{`${location.firstBusLoadTime ? `${moment(location.firstBusLoadTime, 'LT').format('h:mm A')} -` : ``}`} {moment(location.lastBusDepartureTime, 'LT').format('h:mm A')} || {location.LocationName} - ${location.partyPrice.toFixed(2)} each
                            </option>
                              )
                            })
                            : ''}
                        </select>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-5 float-right add-top-margin">
                    {props.displayQuantity && props.ticketsAvailable ?
                      <React.Fragment>
                        <h5>
                          <span className='badge badge-secondary align-left'>
                            <div>${basePrice} per ticket</div>
                            <div>+ ${(basePrice * .1).toFixed(2)} processing fee</div>
                          </span>
                        </h5>

                      </React.Fragment>
                      : ''}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-7">
                    {props.displayQuantity ?
                      <React.Fragment>
                        <div>
                          Ticket Quantity
                        </div>
                        <form className="needs-validation">
                          <div className="form-group">
                            {props.ticketsAvailable.length < 1 ?
                              <button
                                className="btn btn-danger"
                                disabled="disabled"
                                type="button">Currently sold out! Select another location or try back later. </button>
                              :
                              <select
                                className={`custom-select mt-2 ${props.displayAddBtn ? 'is-valid' : ''}`}
                                onChange={props.selectTicketQuantity}
                                disabled={props.ticketsAvailable.length === 0 ? 'disabled' : ''}
                                required>
                                <option value="">Select Quantity</option>
                                {props.ticketsAvailable.map(number => <option key={number} value={number}>{number}</option>)}
                              </select>}
                          </div>
                        </form>
                      </React.Fragment> : ''}
                  </div>
                  <div className="col-md-5 float-right mt-4 py-2">
                    {props.displayAddBtn && props.displayQuantity ?
                      <div>
                        <h3><span className="badge badge-success">
                          Total: ${props.totalCost}
                          {props.pickupLocation}
                        </span></h3>
                      </div> : ''}
                  </div>
                </div>
              </div>
              <div className="list-group-item">
                <div className='row col-md-12'>
                  <button type="button" onClick={props.backToCalendar} className="btn btn-outline-danger return-btn float-right">Cancel</button>
                  {props.displayAddBtn ?
                    <button role="tabpanel" aria-labelledby="cart-tab" type="button" onClick={props.addToCart} className="btn btn-outline-primary return-btn ml-2 float-right">Add to Cart</button> : ''}
                  {props.displayViewCartBtn ?
                    <button aria-labelledby="cart-tab" type="button" onClick={props.viewCart} className="btn btn-outline-success return-btn ml-2 float-right">View Cart</button> : ''}
                </div>
              </div>
            </div>

          </div> : ''}
      </MediaQuery>
      {/* End Desktop View */}


    </div>

  )
}




export default ShowDetailView;
