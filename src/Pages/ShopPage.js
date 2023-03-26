import React from 'react'
import MediaQuery from 'react-responsive'
import logo from '../Images/Logos/bustoshow-text-logo--white-outline-no-fill-328x46.png'
import { useNavigate } from 'react-router-dom';
import ProductList from '../Components/Products/ProductList';

import { useState, useEffect } from 'react';
import { useStore } from '../Store';

const fetchUrl = `${process.env.REACT_APP_API_URL}`;


const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const {displayLoadingScreen, setDisplayLoadingScreen} = useStore();


  useEffect(() => {
    setDisplayLoadingScreen(false);
    fetch(`${fetchUrl}/products`)
      .then(response => response.json())
      .then(data => {
        if(data){
          console.log('data ==>>==>> ', data);
          setProducts(data)
        }
      })
      .catch(error => console.error(error));

  }, []);

  return (
    <div>
    <MediaQuery minWidth={800}>
      <div className="w-75 mx-auto">
        <div className="container-border-orange m-4 p-4">
            <div className='col-12 text-center'>
            <h3 className="bts-orange-bg">Shop</h3>
            <ProductList products={products} />
            </div>
        </div>
    </div>
    </MediaQuery>
    <MediaQuery maxWidth={799}>
      <div className="container-border-orange m-4 p-4">
          <div className='col-12 text-center'>
          <h3 className="bts-orange-bg">Shop</h3>
          <ProductList products={products} />
          </div>
      </div>
    </MediaQuery>
</div>

  );
}



// const Product = ({ product }) => {
//   return (
//     <div>
//       <h2>{product.name}</h2>
//       <p>{product.description}</p>
//       <p>${product.price}</p>
//     </div>
//   );
// }



// export default ShopPage;



// const ShopPage = (props) => {
//   const navigate = useNavigate();



//     return(


//     )
// }

export default ShopPage