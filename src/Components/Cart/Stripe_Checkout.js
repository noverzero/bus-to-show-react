import React from 'react';
import StripeCheckout from 'react-stripe-checkout'

export default class Checkout extends React.Component {

  onToken = (token) => {
    const orderInfo = this.props.cartToSend
    orderInfo.receiptDescription = this.props.receiptDescription
    fetch(`https://innocuous-junior.herokuapp.com/orders/charge`, {
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
    return (
      <React.Fragment>
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
        >
          <button
            onClick={(event) => this.props.makePurchase(event)}
            className={`btn mr-1 ${this.props.validated ? 'btn-outline-success' : 'btn-secondary'}`}
            disabled={this.props.validated ? '' : 'disabled'}
          >
            Purchase
          </button>
        </StripeCheckout>
      </React.Fragment>
    )
  }
}
