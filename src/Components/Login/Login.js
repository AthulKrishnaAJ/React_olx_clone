import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'sonner';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { auth } = useContext(FirebaseContext)
  const [validation, setValidation] = useState({})


  const handleValidation = () => {
      let isValid = true
      let validations = {}

      if(!email){
        validations.emailError = 'Field is required'
        isValid = false
      }

      if(!password){
        validations.passError = 'Field is required'
        isValid = false
      }
      setValidation(validations)
      return isValid
  }
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email, 
            password
          )
      
          toast.success("Login successful")
          setTimeout(() => {
            navigate('/')
          }, 1500);
          console.log('User logged in with user credential: ', userCredential.user)
      } catch (error) {
        console.log(error.message)
        toast.error('Invalid Credentials')
  
      }

    }
  }

  const {emailError, passError} = validation


  const validationStyle = {
    color: 'red',
    fontSize: '12px'
  }
  
  return (
    <div>
      <div className="loginParentDiv">
        <img alt='logo' width="150px" height="150px" src={Logo}></img>
        <form >
          <label htmlFor="fname ">Email</label>
          <br />
        {emailError && <span style={validationStyle}>*{emailError}</span>}
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
        
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
        {passError && <span style={validationStyle}>*{passError}</span>}
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
       
          />
          <br />
          <br />
    
          <button onClick={handleSubmit}>Login</button>
        </form>
        <a href='#!' onClick={() => navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
