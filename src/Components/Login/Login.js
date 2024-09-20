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
  const [error, setErrors] = useState('')
  const { auth } = useContext(FirebaseContext)
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
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
      setErrors('Invalid Credentials')

    }
  }

  const errorStyle = {
    color: 'red',
    fontSize: '14px',
    textAlign: 'center',
    display: 'block',
    marginBottom: '5px'
    
  }
  
  return (
    <div>
      <div className="loginParentDiv">
        <img alt='logo' width="150px" height="150px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname ">Email</label>
          <br />
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
          {error && <span style={errorStyle}>{error}</span>}
          <button>Login</button>
        </form>
        <a href='#!' onClick={() => navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
