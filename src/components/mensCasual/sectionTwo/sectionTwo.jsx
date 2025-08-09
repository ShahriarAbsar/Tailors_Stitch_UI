import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sectionTwo.scss";

const SectionTwo = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.tailors-stitch.com/product?categoryId=${categoryId}`
        );
        const productsData = response.data[0];
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  const formatTitle = () => {
    if (products.length > 0 && products[0].category) {
      return products[0].category.name.toUpperCase();
    }
    return "PRODUCTS";
  };

  return (
    <div className="casualTwo">
      <div className="casualTwoBody">
        <div className="casualtitle">
          <h1>{formatTitle()}</h1>
        </div>
        <div className="casualproducts">
          {loading ? (
            Array.from({ length: 9 }).map((_, idx) => (
              <div className="casualproduct-card" key={idx}>
                <div className="casualplaceholder" />
              </div>
            ))
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : products && products.length > 0 ? (
            products.map((product) => (
              <div className="casualproduct-card" key={product.id}>
                <img
                  src={
                    product.images && product.images.length > 0
                      ? `https://api.tailors-stitch.com/${product.images[0]}`
                      : "https://via.placeholder.com/300x400?text=No+Image"
                  }
                  alt={product.name}
                />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  {/* The price line has been removed */}
                </div>
              </div>
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
