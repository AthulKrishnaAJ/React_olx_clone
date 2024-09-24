import React, {useEffect, useContext}from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css';
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import { onAuthStateChanged } from 'firebase/auth';

// import components
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost';

function App() {
  const { setUser } = useContext(AuthContext)
  const { auth } = useContext(FirebaseContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
          setUser(user)
      }
    })
  })
  
  return (
    <div>
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/create' element={<Create />} />
          <Route path='/view' element={<ViewPost />} />
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
