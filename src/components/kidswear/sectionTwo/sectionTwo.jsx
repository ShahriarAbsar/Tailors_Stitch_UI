import React, { useEffect, useState } from 'react';
import './sectionTwo.scss'
import image from "../../../assets/kidswear/placeholder1.png"
//this image is temporary replace it from backend

const sectionTwo = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API call
  useEffect(() => {
    // Replace this with your actual API call
    setTimeout(() => {
      setProducts([
        { id: 1, image: "../../../assets/MensFormalwear/placeholder1.png" },
        { id: 2, image: "../../../assets/MensFormalwear/placeholder2.png" },
        { id: 3, image: "../../../assets/MensFormalwear/placeholder3.png" },
        { id: 4, image: "../../../assets/MensFormalwear/placeholder1.png" },
        { id: 5, image: "../../../assets/MensFormalwear/placeholder2.png" },
        { id: 6, image: "../../../assets/MensFormalwear/placeholder3.png" },
        { id: 7, image: "../../../assets/MensFormalwear/placeholder1.png" },
        { id: 8, image: "../../../assets/MensFormalwear/placeholder2.png" },
        { id: 9, image: "../../../assets/MensFormalwear/placeholder3.png" },
      ]);
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <div className="casualTwo">
      <div className="casualTwoBody">
        <div className="casualtitle">
          <h1>KID'S Wear</h1>
        </div>
        <div className="casualproducts">
          {(loading ? Array.from({ length: 9 }) : products).map(
            (product, idx) => (
              <div className="casualproduct-card" key={idx}>
                {loading ? (
                  <div className="casualplaceholder" />
                ) : (
                  // <img src={product.image} alt={`Product ${idx + 1}`} />
                  <img src={image} alt={`Product ${idx + 1}`} />
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default sectionTwo;
