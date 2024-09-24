import React, { useState ,useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Heart from '../../assets/Heart';
import './Post.css';

import { FirebaseContext } from '../../store/FirebaseContext';
import { postContext } from '../../store/postContext';

import { getDocs, collection } from 'firebase/firestore';




function Posts() {

  const { firestore } = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const {setPostDetails} = useContext(postContext)

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



  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
         
        </div>
        <div className="cards">
          { products.map((product, i) => {

        return ( 

        <div
            className="card"
         key={i}  
         onClick={() => {
            setPostDetails(product)
            navigate('/view')
         }}
         >
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
          {
            products.map((product , i) => {
              if(product.category === 'Four Wheeler'){
                return (
                  <div className="card"
                  key={i}
                    onClick={() => {
                      setPostDetails(product)
                      navigate('/view')
                    }}
                  >
                    <div className="favorite">
                      <Heart></Heart>
                    </div>
                    <div className="image">
                      <img src={product.url} alt="" />
                    </div>
                    <div className="content">
                      <p className="rate">&#x20B9; {product.price}</p>
                      <span className="kilometer">{product.category}</span>
                      <p className="name"> {product.name}</p>
                    </div>
                    <div className="date">
                      <span>{product.createdAt}</span>
                    </div>
                  </div>

                )

              }
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Posts;
