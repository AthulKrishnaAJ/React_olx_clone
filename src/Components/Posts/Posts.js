import React, { useState ,useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Heart from '../../assets/Heart';
import './Post.css';

import { FirebaseContext } from '../../store/FirebaseContext';
import { getDocs, collection } from 'firebase/firestore';

import View from '../View/View';


function Posts() {

  const { firestore } = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
      const fetchDetails = async () => {
        try{
          const productQuery = await getDocs(collection(firestore, "products"));
          const allUploads = productQuery.docs.map((product) => ({
            id: product.id,
            ...product.data()
          }))
          console.log(allUploads)
          setProducts(allUploads)
          
        }catch(error){
          console.log('Error while fetching products: ', error.message)
        }
      }
      fetchDetails()
  }, [firestore])

  const handleViewPost = (product) => {
      View(product)
      navigate('/view')

  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          { products.map((product, i) => {

        return ( 

        <div
            className="card"
         key={i}  onClick={() => handleViewPost(product)}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          )
          })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
