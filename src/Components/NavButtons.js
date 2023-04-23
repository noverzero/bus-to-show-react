import React, { useRef, useState , useEffect} from 'react';
import MediaQuery from 'react-responsive'
import '../App.css';
import logo from '../Images/Logos/bustoshow-text-logo--white-outline-no-fill-328x46.png'
import { useNavigate } from 'react-router-dom';


const NavButtons = (props) => {
  const navigate = useNavigate()
  const [showDashboardButton, toggleShowDashboardButton] = useState(true);
  const myRef = useRef(null);


  useEffect(() => {
    window.$(myRef.current).tooltip();
    if(!true) {
        console.log('what would you do here?')
    }
  }, []);

  return (
    <nav className="row align-items-left">
      <div className="ml-3 mt-1 mr-4"></div>
      <div className="row">
        <MediaQuery maxWidth={799}>
        <div className="col-6 px-2 mb-2">
            {true ? (
              <button
                className="btn detail-btn btn-widener btn-block"
                onClick={() => {
                  navigate('/faqs');
                }}
              >
                FAQs
              </button>
            ) : (
              ''
            )}
          </div>
          <div className="col-6 px-2 mb-2">
            {false ? (
              <button
                className="btn detail-btn btn-widener btn-block"
                onClick={() => {
                  navigate('/shop');
                }}
              >
                Season Passes
              </button>
            ) : (
              ''
            )}
          </div>

        </MediaQuery>
        <MediaQuery minWidth={800}>
          <div className="row border-0 p-2 mr-2">
          <div className="col px-2">
              {true ? (
                <button
                  className="btn detail-btn btn-widener"
                  onClick={() => {
                    navigate('/faqs');
                  }}
                >
                  FAQs
                </button>
              ) : (
                ''
              )}
            </div>
            <div className="col px-2">
              {false ? (
                <button
                  className="btn detail-btn btn-widener"
                  onClick={() => {
                    navigate('/shop');
                  }}
                >
                  Season Passes
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </MediaQuery>
      </div>
    </nav>
  );
};


export default NavButtons;
