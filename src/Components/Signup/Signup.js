import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';


export default function Signup() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})

  const {firestore, auth} = useContext(FirebaseContext)

  const validateForm = () => {
      let formsErrors = {}
      let isValid = true

      const emailRegex = /\S+@\S+\.\S+/;

      if (!username) {
        formsErrors.usernameError = 'Field is required'
        isValid  = false
      } else {
        formsErrors.usernameError = ''
      }

      if (!email) {
        formsErrors.emailError = 'Field is required'
        isValid = false
      } else if(!emailRegex.test(email)) {
        formsErrors.emailError = 'Enter a valid email'
        isValid = false
      } else {
        formsErrors.emailError = ''
      }

      if (!phone) {
        formsErrors.phoneError = 'Field is required'
        isValid = false
      } else if(phone.length < 10 || phone < 0) {
        formsErrors.phoneError = 'Enter valid mobile number'
        isValid = false
      } else {
        formsErrors.phoneError = ''
      }

      if(!password) {
        formsErrors.passwordError = 'Field is required'
        isValid = false
      } else if(password.length < 6) {
        formsErrors.passwordError = 'Enter atleast 6 character'
        isValid = false
      } else {
        formsErrors.passwordError = ''
      }

      setErrors(formsErrors)
      return isValid
  }

  const handleSubmit = async(event) => {
    event.preventDefault();

    if(validateForm()){
    try{
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

        await updateProfile(userCredential.user, {displayName: username});

        const doc = await addDoc(collection(firestore, 'users'), {
          id: userCredential.user.uid,
          username: username,
          phone: phone
        })

        console.log('userId: ', doc.id)
        navigate('/login')
        
    }catch(error) {
        console.log(error.message)
    }
  }
 
  }

  const errorStyle = {
    color: 'red',
    fontSize: '12px'
  }
  const {usernameError, emailError, phoneError, passwordError} = errors
  console.log(usernameError)
  return (
    <div>
      <div className="signupParentDiv">
        <img width="150px" height="150px" src={Logo} alt='logo'/>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
        {usernameError && <span style={errorStyle}>*{usernameError}</span>}
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          {emailError && <span style={errorStyle}>*{emailError}</span>}
          <input
            className="input"
            // type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          {phoneError && <span style={errorStyle}>*{phoneError}</span>}
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
           
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          {passwordError && <span style={errorStyle}>*{passwordError}</span>}
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
          <button>Signup</button>
        </form>
        <a href='#!' onClick={() => navigate('/login')}>login</a>
      </div>
    </div>
  );
}
