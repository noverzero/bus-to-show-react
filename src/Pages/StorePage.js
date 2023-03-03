import React from 'react'
import MediaQuery from 'react-responsive'
import logo from '../Images/Logos/bustoshow-text-logo--white-outline-no-fill-328x46.png'
import { useNavigate } from 'react-router-dom';




const StorePage = (props) => {
  const navigate = useNavigate();



    return(
        <div>
              <MediaQuery minWidth={800}>
                <div className="w-75 mx-auto">
                  <div className="container-border-orange m-4 p-4">
                      <div className='col-12 text-center'>
                      <h3 className="bts-white-bg">Loading</h3>
                      </div>
                  </div>
              </div>
              </MediaQuery>
              <MediaQuery maxWidth={799}>
                <div className="container-border-orange m-4 p-4">
                    <div className='col-12 text-center'>
                    <h3 className="bts-white-bg">Loading</h3>
                    </div>
                </div>
              </MediaQuery>
        </div>

    )
}

export default StorePage