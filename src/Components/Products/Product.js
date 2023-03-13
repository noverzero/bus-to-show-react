import React, { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

const fetchUrl = `${process.env.REACT_APP_API_URL}`;
const token = `${process.env.REACT_APP_STRIPE_PUBLIC || 'pk_live_WZRwtpLAFcufugeQKbtwKobm' || 'pk_test_J0CdRMCGmBlrlOiGKnGgUEwT'} `;

export const Product = ({ product }) => {

    console.log('Product ==>>==>> ', product);
    return (
      <div className="store-grid">
        <div className="card container-border-orange m-4 w-50">
          <div className="card-body">
            <h5 className="card-header mb-2 ">{product.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">${product.price}</h6>
            <p className="card-text">{product.description}</p>
              <Link 
                to={`/products/${product.id}`}
                state = { {product: product}}
                className="card-link"
              >View Details</Link>
          </div>
        </div>
      </div>
    );
  }
  
  export const ProductDetail = () => {
    const { id } = useParams();
    const {state } = useLocation(); // get the location object
    const product = state.product
    
    const [email, setEmail] = useState('');

    const buyNow = async (product) => {
      console.log('buy now clicked ==>>==>> ', token);
      try {
        const response = await fetch(`${fetchUrl}/store`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            email,
          }),
        });
  
        if (response.ok) {
          alert('Purchase successful!');
        } else {
          alert('Purchase failed.');
        }
      } catch (error) {
        console.error(error);
        alert('Purchase failed.');
      }
    };

  
    console.log('ProductDetail component loaded ==>>==>> ', state);
    if (!useLocation() || !product) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div className="card container-border-orange m-4 w-50">
            <div className="card-body">
              <h5 className="card-header mb-2 ">{product.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">${product.price}</h6>
              <p className="card-text">{product.description}</p>
              <button type="button" className="btn btn-primary" onClick={()=>{buyNow(product)}}>Buy Now</button>
              <div>
                <h1>Purchase Season Pass</h1>
                <label>
                  Email:
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <StripeCheckout
                  stripeKey="YOUR_STRIPE_PUBLIC_KEY"
                  token={buyNow}
                  amount={9999}
                  name="Season Pass"
                  description="One season pass for $99.99"
                  billingAddress
                  zipCode
                />
              </div>
            </div>

          </div>
        </div>
      )
    }
  
  };
