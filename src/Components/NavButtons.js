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
    <nav className='row align-items-left'>
      <div className="col-sm-2 ml-3 mt-1 mr-4">
      </div>
      <div className="col-sm-2">
        <div
          className= "border-0 p-2 mr-2">
          <div>
              <button className="btn detail-btn mr-2 btn-widener" onClick={()=>{navigate('/store')}}>Season Passes
              </button>
          </div>
    </div>
  </div>
  </nav>

  )
}

export default NavButtons;
