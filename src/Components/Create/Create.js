import React, { Fragment, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';


const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
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
          <img alt="Posts" width="200px" height="200px" src={image} />
            <br />
            <input 
            type="file" 
            onChange={(event) => setImage(URL.createObjectURL(event.target.files[0]))} 
            />
            <br />
            <button className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
