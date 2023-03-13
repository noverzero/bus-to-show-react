import React from 'react'
import MediaQuery from 'react-responsive'
import logo from '../Images/Logos/bustoshow-text-logo--white-outline-no-fill-328x46.png'
import { useNavigate } from 'react-router-dom';
import ProductList from '../Components/Products/ProductList';

import { useState, useEffect } from 'react';

const StorePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      //.then(response => response.json())
      .then(data => {
        if(false){
          console.log('data ==>>==>> ', data);
          setProducts(data)
        } else {
          const hardCoded = [   {
            id: '1',
            name: 'Season Pass',
            type: 'Pass',
            price: 300.00,
            image: 'src/Images/dustin.jpeg',
            description: 'All you can ride busfet'
        },
        {
            id: '2',
            name: '$50 Gift Card',
            type: 'Pass',
            price: 50.00,
            image: 'src/Images/seth',
            description: 'Give the gift of BTS'
        },
        {
            id: '3',
            name: '$100 Gift Card',
            type: 'Pass',
            price: 100.00,
            image: 'src/Images/jake',
            description: 'Give the gift of BTS'
        },
        {
            id: '4',
            name: 'Back in the day pricing',
            type: 'Pass',
            price: 25.00,
            image: 'src/Images/kevin',
            description: 'Buy rides in advance, get pricing from the past.'
        }]

        setProducts(hardCoded)
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
            <h3 className="bts-orange-bg">Store</h3>
            <ProductList products={products} />
            </div>
        </div>
    </div>
    </MediaQuery>
    <MediaQuery maxWidth={799}>
      <div className="container-border-orange m-4 p-4">
          <div className='col-12 text-center'>
          <h3 className="bts-orange-bg">Store</h3>
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



// export default StorePage;



// const StorePage = (props) => {
//   const navigate = useNavigate();



//     return(


//     )
// }

export default StorePage