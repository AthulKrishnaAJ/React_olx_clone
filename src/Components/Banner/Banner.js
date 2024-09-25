
import { useContext, useEffect, useState } from 'react';

import './Banner.css';
import Arrow from '../../assets/Arrow'
import { FirebaseContext } from '../../store/FirebaseContext';
import { getDocs, collection } from 'firebase/firestore';

function Banner() {
  const { firestore } = useContext(FirebaseContext)
  const [category, setCategory] = useState([])
  const set = new Set()
  const [showCategory, setShowCategory] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const productQuery = await getDocs(collection(firestore, 'products'));
        const allProducts = productQuery.docs.map((prd) => ({
          ...prd.data()
        }))
        console.log('product query in banner: ', allProducts)

        allProducts.map((product) => {
          set.add(product.category)
        })
        if(set){
          setCategory([...set])
        }

      } catch (error) {
        console.error(`Error while fetching products in banner ${error.message}`)
      }
    }
    fetchDetails()
  }, [])

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div 
          className="categoryMenu"
          onMouseEnter={() => setShowCategory(true)}
          onMouseLeave={() => setShowCategory(false)}
          >
            <span className='categoryHead'>ALL CATEGORIES</span>
            <Arrow></Arrow> 
            {
              showCategory && (
              <div className="categoryPopup">
                {category.map((cat, i) => (
                  <div className="categoryList" key={i}>

                    <span>{cat}</span>
                    
                  </div>
                ))}
              </div>
            )
        }

          </div>
          <div className="otherQuickOptions">
            <span>Cars</span>
            <span>Motorcy...</span>
            <span>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span>
          </div>
        </div>
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
      </div>
      
    </div>
  );
}

export default Banner;
