import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import './View.css';
import { postContext } from '../../store/postContext';
import { FirebaseContext } from '../../store/FirebaseContext';

import { collection, getDocs, query, where } from 'firebase/firestore';



function View() {
  const [userDetails, setUserDetails] = useState()
  const {postDetails, setPostDetails} = useContext(postContext)
  const { firestore } = useContext(FirebaseContext)
  const navigate = useNavigate()


  useEffect(() => {

    if(!postDetails){
       const storeDetails = localStorage.getItem('postDetails')
       if(storeDetails){
        setPostDetails(JSON.parse(storeDetails))
       }
    }
    const { userId } = postDetails

    const fetchUser = async () => {
      try {
        const user = query(
          collection(firestore, 'users'),
          where('id', '==', userId)
        )

        const snap = await getDocs(user)
        snap.forEach((doc) => {
          setUserDetails(doc.data())
        })
      } catch (error) {
          console.log('Error in fetching user data')
      }
    };
    fetchUser()
  
    
  }, [postDetails])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        { userDetails && (
        <div className="contactDetails">
          <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>1234567890</p>

        </div>
        )

        }
      </div>
    </div>
  );
}
export default View;
