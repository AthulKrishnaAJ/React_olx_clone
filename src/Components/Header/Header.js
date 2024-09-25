import React, { useContext, useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom'



import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import {  signOut } from "firebase/auth";

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';


function Header() {

  const [isHovered, setIsHovered] = useState(false)
  const {user} = useContext(AuthContext)
  const { auth } = useContext(FirebaseContext)
  const navigate = useNavigate()
  const location = useLocation()
  let timeOut

  const handleMouseEnter = () => {
    clearTimeout(timeOut)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    timeOut = setTimeout(() => {
    setIsHovered(false)
    }, 200)
  }

  const signOutUser =  () => {
      signOut(auth).then(() => {
          navigate('/login')
          console.log('Signout successfully')
      }).catch((error) => {
        console.log(error.message)
      })
  }



  return (
  
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={() => navigate('/')}>
          <OlxLogo></OlxLogo>
        </div>
        {/* <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div> */}
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>

        <div 
        className="loginPage"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>

          {user ? <span>Welcome {user.displayName}</span>
           : <span onClick={() => navigate('/login')}>Login</span>}
          <hr />
         { isHovered && user && (
            <div className='dropdown'>
            <span onClick={signOutUser}>Logout</span>
          </div>
        )}
    
        </div>
        <div className="sellMenu">
        {location.pathname !== '/create' && (
          <div 
           onClick={() => navigate('/create')}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
        )}
          </div>
      </div>
    </div>
    
  );
}

export default Header;
