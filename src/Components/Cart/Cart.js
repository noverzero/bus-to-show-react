import React, {useState, useEffect}  from 'react'
import '../../App.css'
import CartItem from './CartItem'
import Checkout from './Stripe_Checkout'
import MediaQuery from 'react-responsive'
import logo from '../../Images/Logos/bts-logo-gray.png'
import {useStore} from '../../Store'


const Cart = (props) => {
  const {btsUser, passStatus, setPassStatus} = useStore();

  let cTSendId = props.cartToSend && props.cartToSend.eventId

  const showInfo = props.shows.find(show => parseInt(show.id) === parseInt(cTSendId))

  let savings = Number(props.afterDiscountObj.totalSavings)
  let costAfterSavings = Number(props.afterDiscountObj.totalPriceAfterDiscount)
  let finalTotalCost = costAfterSavings

  useEffect(async () => {
    //check API to see if user season pass has been used for this show.
    //if not, set discountCode to match user's season pass code.
    //if so, disable use season pass checkBox

   
    const checkSeasonPassEventStatus = async () => {
      const response = await  fetch(`${process.env.REACT_APP_API_URL}/discount_codes/${btsUser.userID}/${props.displayShow.id}`)
      let result = await response.json()
      setPassStatus(result)
      return result;
    }

    if(btsUser.isLoggedIn) await checkSeasonPassEventStatus()

    

  }, []);

  const maskPhoneInput = (e) => {
    var part = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
    e.target.value = !part[2] ? part[1] : '(' + part[1] + ') ' + part[2] + (part[3] ? '-' + part[3] : '')
  }

  const phoneInput = (e) => {
      maskPhoneInput(e)
      props.updatePurchaseField(e)
  }

  const { invalidFirstName, invalidLastName, invalidEmail, invalidPhone } = props.invalidFields

  return (
    <div className='Cart'>
      {/* Desktop View */}
      <MediaQuery minWidth={8}>
        <React.Fragment>
          {props.inCart.length === 0 ?
            <div className="nothing-in-cart">
              <div className="row container nothing-in-cart-text">
                <div className="col-md-12 mt-3">
                  {props.purchaseSuccessful ?
                    <div>
                      <h2>Thank you for your purchase to {showInfo.headliner} on {showInfo.date}!</h2>
                      <h4>You should receive a confirmation email shortly</h4>
                      <h6>Please email reservations@bustoshow.org or call 844.BUS.2.SHO with any questions.</h6>
                      <MediaQuery maxWidth={799}>
                        <button
                          id='backToCalendar'
                          onClick={props.backToCalendar}
                          type="button"
                          className='btn detail-btn my-4 col-md-2'>Back to Calendar</button>
                      </MediaQuery>
                    </div>
                    : <h1>Nothing in Cart!</h1>}
                </div>
                <div className="col-md-12 mt-3">
                  <img
                    className='nothing-in-cart-image'
                    src={logo}
                    alt="bts-logo"
                    width="233"
                    height="100" />
                </div>
              </div>
            </div>
            :
            <div className="list-group">
              {props.displayWarning || props.purchasePending || props.purchaseSuccessful || props.displayConfirmRemove ?
                <div className="row">
                  <div className="col-md-12">
                    {props.displayWarning ? <div className="alert alert-warning mb-2" role="alert">
                      <h6 className="warning-text">
                        We are currently only able to process orders for one event at a time.  Please either complete your reservation for this event, or click “cancel order”  to change qty or start over with a different event.
                      </h6>
                      <div className="warning-btns">
                        <button onClick={props.removeFromCart} type="button" className="btn btn-sm btn-danger mr-2">Cancel & Start Over</button>
                        <button onClick={props.closeAlert} type="button" className="btn btn-sm btn-success">Continue With Order</button>
                      </div>
                    </div> : ''}
                    {(props.purchasePending && !props.purchaseFailed) ?
                    <div className="alert alert-primary" role="alert"> Purchase Pending... </div>
                    :
                    (props.purchasePending && props.purchaseFailed ?
                      <div className="alert alert-danger" role="alert"> Payment Declined, Please Try Another Card or Something. </div> : '')}
                    {props.displayConfirmRemove ? <div className="alert alert-danger" role="alert">
                      Are you sure you want to remove item from cart?
                    <button onClick={props.confirmedRemove} type="button" className="btn btn-danger ml-1">Remove</button>
                      <button onClick={props.closeAlert} type="button" className="btn btn-outline-secondary ml-1">Continue Order</button>
                    </div> : ''}
                  </div>
                </div>
                : ''}

              <div className="row">
                <div className="col-md-12">
                  <CartItem
                    afterDiscountObj={props.afterDiscountObj}
                    closeAlert={props.closeAlert}
                    confirmedRemove={props.confirmedRemove}
                    confirmRemove={props.confirmRemove}
                    displayConfirmRemove={props.displayConfirmRemove}
                    firstBusLoad={props.firstBusLoad}
                    getPickupParty={props.getPickupParty}
                    lastDepartureTime={props.lastDepartureTime}
                    pickupLocationId={props.pickupLocationId}
                    pickupLocations={props.pickupLocations}
                    pickupParties={props.pickupParties}
                    removeFromCart={props.removeFromCart}
                    shows={props.shows}
                    showsInCart={props.showsInCart}
                    ticketPrice={props.ticketPrice}
                    ticketQuantity={props.ticketQuantity}
                    totalCost={props.totalCost} />
                </div>
              </div>
              <div className="alert alert-warning">Cart will reset after 6 minutes</div>
              {props.showsInCart ?
                <div className="list-group-item" >
                  <div className="row">
                    <div className="col-md-12">
                      <form
                        className="needs-validation"
                        onSubmit={e=>e.preventDefault()}
                        noValidate>
                        <div className="form-row">
                          <div className="col-md-4 mb-3">
                            <label htmlFor="firstName">First Name</label>
                            <input
                              onChange={props.updatePurchaseField}
                              type="text"
                              className={`form-control ${props.validatedElements.firstName ? 'is-valid' : ''}`}
                              id="firstName"
                              placeholder="First Name"
                              style={{border: invalidFirstName ? '2px solid red' : ''}}
                              required />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                              onChange={props.updatePurchaseField}
                              type="text"
                              className={`form-control ${props.validatedElements.lastName ? 'is-valid' : ''}`}
                              id="lastName"
                              placeholder="Last Name"
                              style={{border: invalidLastName ? '2px solid red' : ''}}
                              required />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-md-8 mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                              onChange={props.updatePurchaseField}
                              type="email"
                              className={`form-control ${props.validatedElements.email ? 'is-valid' : ''}`}
                              id="email"
                              placeholder="Email address"
                              style={{border: invalidEmail ? '2px solid red' : ''}}
                              required />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-md-8 mb-3">
                            <label htmlFor="orderedByPhone">Phone</label>
                            <input
                              onChange={phoneInput}
                              type="phone"
                              className={`form-control ${props.validatedElements.orderedByPhone ? 'is-valid' : ''}`}
                              id="orderedByPhone"
                              placeholder="(XXX) XXX-XXXX"
                              style={{border: invalidPhone ? '2px solid red' : ''}}
                              required />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-md-8 mb-3">
                            {//checkbox for Use Season Pass to purchase tickets
                            }
                            { passStatus && passStatus.message === 'Season pass discount code is available.' ?  
                            <div className="form-check">
                              <input
                                type={'checkbox'} 
                                disabled={props.checked}
                                className="form-check-input" 
                                id="useSeasonPass"
                                onChange={props.updatePurchaseField} />
                              <label className="form-check-label" htmlFor="useSeasonPass">Use Season Pass</label>
                            </div>
                            : 
                            <div></div>
                          }
                          </div>
                        </div>
                      
                        {/* Ternary to display will call name fields or button to show fields */}
                        {props.checked ?
                        //close button with onClick to remove will call name fields and set props.checked to false
                          <div>
                            <div className="form-row">
                              <div className="col-md-4 mb-3">
                                <button
                                  onClick={props.handleCheck}
                                  type="button" 
                                  className="btn btn-outline-primary">Close</button>
                              </div>
                            </div> 
                            <div className="form-row">
                              <div className="col-md-4 mb-3">
                                <label htmlFor="willCallFirstName">Will Call First Name</label>
                                <input
                                  onChange={props.updatePurchaseField}
                                  type="text"
                                  className='form-control'
                                  id="willCallFirstName"
                                  placeholder="First Name" />
                              </div>
                              <div className="col-md-4 mb-3">
                                <label htmlFor="willCallLastName">Will Call Last Name</label>
                                <input
                                  onChange={props.updatePurchaseField}
                                  type="text"
                                  className='form-control'
                                  id="willCallLastName"
                                  placeholder="Last Name" />
                              </div>
                            </div>
                          </div>
                          :
                          <div className="form-row">
                            <div className="col-md-4 mb-3">
                              <button
                                onClick={props.handleCheck}
                                type="button"
                                disabled={props.isUseSeasonPassChecked}
                                className="btn btn-outline-primary">Reserving for someone else?</button>
                            </div>
                          </div>}
                        <div className="form-row">
                          <div className="col-md-4 mb-3">
                            <input
                              onChange={props.updateDiscountCode}
                              type="text"
                              className='form-control'
                              id="discountCode"
                              placeholder="Discount Code" />
                          </div>
                          <div className="col-md-4 mb-3">
                            {!props.discountApplied ?
                              <button type="button" onClick={props.findDiscountCode} className="btn btn-outline-secondary" >Apply</button>
                              :
                              <button type="button" onClick={props.findDiscountCode} className="btn btn-outline-secondary" disabled>Your Savings: {props.afterDiscountObj.savings.toFixed(2)}</button>
                            }
                          </div>
                        </div>

                        <div className='row display-flex'>
                          {savings ?
                            <div className="col-4">
                              <h5>Total savings:
                          <span className="badge badge-secondary ml-1">{`$${savings}`}</span>
                              </h5>
                            </div>
                            : ""
                          }
                        </div>
                        <div className='form-row cart-flex'>
                          <div>
                          <MediaQuery maxWidth={799}>
                            <button onClick={props.confirmedRemove} type="button" className="btn btn-outline-danger mr-1">Cancel</button>
                          </MediaQuery>
                          <MediaQuery minWidth={800}>
                            <button onClick={props.removeFromCart} type="button" className="btn btn-outline-danger mr-1">Cancel</button>
                          </MediaQuery>
                          {!props.purchasePending ?
                            <Checkout
                              cartToSend={props.cartToSend}
                              comp={props.comp}
                              makePurchase={props.makePurchase}
                              purchasePending={props.purchasePending}
                              validated={props.validated}
                              purchase={props.purchase}
                              afterDiscountObj={props.afterDiscountObj}
                              ticketTimer={props.ticketTimer}
                              totalCost={props.totalCost}
                              showsInCart={props.showsInCart}
                              invalidOnSubmit={props.invalidOnSubmit}>
                            </Checkout>
                            : ''
                          }
                          </div>
                          <div className="cartTotal">
                            <h3>Cart Total:
                                <span className="badge badge-success">{`$${props.totalCost}`}</span>
                            </h3>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div> : ''}
            </div>}
        </React.Fragment>
      </MediaQuery>
      {/* End Desktop View */}

    </div >

  )
}

export default Cart;
