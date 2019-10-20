import React from 'react';
import StripeCheckout from 'react-stripe-checkout'

//const fetchUrl = `http://localhost:3000`
//const fetchUrl = `https://bts-test-backend.herokuapp.com`
const fetchUrl = `https://innocuous-junior.herokuapp.com`

export default class Checkout extends React.Component {

  onToken = (token) => {
    this.props.ticketTimer(false)
    const orderInfo = this.props.cartToSend
    orderInfo.receiptDescription = this.props.receiptDescription
    fetch(`${fetchUrl}/orders/charge`, {
      method: 'POST',
      body: JSON.stringify({
        stripeEmail: token.email,
        stripeToken: token,
        amount: this.props.totalCost * 100,
        metadata: orderInfo
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async response => {
      const json = await response.json()
      if (json.status == "succeeded") {
        this.props.purchase()
      } else {
        this.props.purchase(json)
      }
    })
  }


  render() {
    const email = this.props.cartToSend.email
    const selectResponse = e => {
        this.props.validated ?
        this.props.makePurchase(e) :
        this.props.invalidOnSubmit(e)


    }

    return (
      <React.Fragment>
        {!this.props.totalCost ?
          <button
            onClick={this.props.comp}
            className={`btn mr-1 ${this.props.validated ? 'btn-outline-success' : 'btn-secondary'}`}
          >
          Happy Birthday
          </button>
          :
        <StripeCheckout
          token={this.onToken}
          //stripeKey="pk_test_J0CdRMCGmBlrlOiGKnGgUEwT"
          stripeKey="pk_live_WZRwtpLAFcufugeQKbtwKobm"
          name='Bus To Show'
          description='Receipt will be emailed after purchase'
          email={email}
          amount={this.props.totalCost * 100}
          currency='USD'
          metadata={this.props.cartToSend}
          disabled={this.props.validated ? false : true}
        >

          <button
            onClick={e=>selectResponse(e)}
            className={`btn mr-1 ${this.props.validated ? 'btn-outline-success' : 'btn-secondary'}`}
          >
          Purchase
          </button>

        </StripeCheckout>
      }
      </React.Fragment>
    )
  }
}
