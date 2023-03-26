import React, { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

const fetchUrl = `${process.env.REACT_APP_API_URL}`;
const stripePublic = `${process.env.REACT_APP_STRIPE_PUBLIC}`;

export const Product = ({ product }) => {

    console.log('Product ==>>==>> ', product);
    return (
      <div className="shop-grid">
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

    const buyNow = async (token) => {
      token.product = product
      console.log('buy now clicked ==>>==>> ', token);
      try {
        const response = await fetch(`${fetchUrl}/purchases`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token

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
              <div>
                <label>
                  Email:
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <StripeCheckout
                  stripeKey={stripePublic}
                  token={buyNow}
                  amount={product.price * 100}
                  name={product.name}
                  description={`${product.description} 2023 for $${product.price}`}
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
