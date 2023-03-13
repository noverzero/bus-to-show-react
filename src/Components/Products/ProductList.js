import React, { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive'
//import logo from '../Images/Logos/bustoshow-text-logo--white-outline-no-fill-328x46.png'
import { useNavigate } from 'react-router-dom';
import {Product} from './Product';


const ProductList = ({ products }) => {
    return (
      <div>
        {products.map(product => (
          <div key={product.id}>
                <MediaQuery minWidth={800}>
                  <div className="mx-auto">
                    <div className="">
                        <div className='col-12 text-center'>
                        <Product product={product} />
                        </div>
                    </div>
                </div>
                </MediaQuery>
                <MediaQuery maxWidth={799}>
                  <div className="container-border-orange m-4 p-4">
                      <div className='col-12 text-center'>
                      <Product product={product} />
                      </div>
                  </div>
                </MediaQuery>

          </div>
        ))}
      </div>
    );
  }

export default ProductList
