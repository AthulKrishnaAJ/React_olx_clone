import React, { Fragment, useState, useContext } from 'react';
import {  useNavigate } from 'react-router-dom';

import { PropagateLoader } from 'react-spinners';


import './Create.css';
import Header from '../Header/Header';

import { FirebaseContext, AuthContext } from '../../store/FirebaseContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'sonner';


const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const date = new Date()

  const { firestore, storage } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)

  const handleValidation = () => {
      
      let formErrors = {}
      let isValid = true
      let validChar = /^[a-zA-Z0-9\s]+$/;
      const allowedFile = ['image/jpg', 'image/jpeg', 'image/png']
      
      if (!user || !user.uid) {
        toast.error("Please login")
        return false
      } 

      if (name.trim() === '') {
          formErrors.nameError = 'Field is required';
          isValid = false
      } else if (!validChar.test(name)) {
        formErrors.nameError = 'Special character not allowed';
        isValid = false
      } else {
        formErrors.nameError = ''
      }
       

      if (category === '') {
          formErrors.categoryError = 'Field is required';
          isValid = false
      } else if (!validChar.test(category)) {
          formErrors.categoryError = 'Special character not allowed';
          isValid = false
      } else {
        formErrors.categoryError = ''
      }

      if (price === '') {
          formErrors.priceError = 'Field is required';
          isValid = false
      } else if (price <= 0) {
          formErrors.priceError = 'Enter a valid amount';
          isValid = false
      } else {
        formErrors.priceError = ''
      }

      if (!image) {
        formErrors.imageError = 'Field is required';
        isValid = false
      } else if (!allowedFile.includes(image.type)) {
          formErrors.imageError = 'Upload only jpg jpeg and png files'
          isValid = false
      } else {
        formErrors.imageError = ''
      }



      setErrors(formErrors)
      return isValid
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (handleValidation()) {
      if(image) {
        setLoading(true)
        try {
          console.log('image: ',  image)
          const storageRef = ref(storage, `/image/${image.name}`)
          const snap = await uploadBytes(storageRef, image)
          console.log(snap)
          const url = await getDownloadURL(snap.ref)

          await addDoc(collection(firestore, 'products'), {
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toDateString()
          })
          console.log('successfully added')
          setTimeout(() => {
            setLoading(false)
            navigate('/')
          }, 3000)
          toast.success("Product uploaded")
        } catch (error) {
            console.log(error.message)
        }
      } 


    }

  }

  const {nameError, categoryError, priceError, imageError} = errors

  const errorStyle = {
    color: 'red',
    fontSize: '13px'
  }


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

          <form>
            <label htmlFor="fname">Name</label>
            <br />
            {nameError && <span style={errorStyle}>*{nameError}</span>}
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            {categoryError && <span style={errorStyle}>*{categoryError}</span>}
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
          
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            {priceError && <span style={errorStyle}>*{priceError}</span>}
            <input 
            className="input" 
            type="number" 
            id="fname" 
            name="Price" 
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            />
            <br />
          </form>
          <br />
          <img alt='post' src={image ? URL.createObjectURL(image) : ''} />
            <br />
            {imageError && <span style={errorStyle}>*{imageError}</span>}
            <input 
            type="file" 
            className='imgUploader'
            onChange={(event) => setImage(event.target.files[0])} 
            />
            <br />

            <div className='formWrapper'>
            {
              loading ? (
              <div className='loading'>
                <PropagateLoader color=' #002f34'/>
                </div>
                ) : (
                <button className="uploadBtn" onClick={handleSubmit}>
                Upload
              </button>
              )}
            </div>
        </div>
      </card>

    </Fragment>
  );
};

export default Create;
