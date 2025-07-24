import React, { useState, useEffect } from "react";
import axios from "axios";
import './Admin.scss';

const AdminDashboard = ({ setAuthenticated }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true); // Renamed for clarity
  const [categoriesError, setCategoriesError] = useState(null); // Renamed for clarity

  const [selectedCategory, setSelectedCategory] = useState(null);

  // New states for products
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    images: []
  });

  // --- API Integration: Fetch Categories on component mount ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/category');
        setCategories(response.data);
      } catch (err) {
        setCategoriesError('Failed to fetch categories. Please try again.');
        console.error('Error fetching categories:', err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []); // Runs once on component mount

  // --- NEW: API Integration: Fetch Products when selectedCategory changes ---
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (selectedCategory) { // Only fetch if a category is selected
        setLoadingProducts(true);
        setProductsError(null); // Clear previous errors
        try {
          // Adjust this URL to your backend's actual product endpoint (e.g., /product)
          const response = await axios.get(`http://localhost:3000/product?categoryId=${selectedCategory.id}`);
          setProducts(response.data);
        } catch (err) {
          setProductsError(`Failed to fetch products for ${selectedCategory.name}.`);
          console.error('Error fetching products:', err);
        } finally {
          setLoadingProducts(false);
        }
      } else {
        setProducts([]); // Clear products if no category is selected
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]); // Re-run this effect whenever selectedCategory changes

  // --- Form Handling ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = () => {
    console.log("Submitted Product:", formData);
    // You'd typically send this product data to your backend here
    setFormData({ name: '', description: '', price: '', images: [] });
    setShowForm(false);
    // After successful product submission, you might want to re-fetch products
    // fetchProductsByCategory(); // This would re-fetch for the current selected category
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Tailor Stitch Admin</h2>
        <nav>
          <button>Dashboard</button>
          <button>Categories</button>
          <button>All Products</button>
          <button>Settings</button>
          <button className="logout-sidebar-btn" onClick={handleLogout}>Logout</button>
        </nav>
        <div className="admin-footer">
          <p>
            <strong>Admin User</strong>
          </p>
          <p>admin@tailorstitch.com</p>
        </div>
      </aside>

      <main className="main-content">
        {!selectedCategory ? (
          <div>
            <h1>Product Categories</h1>
            {loadingCategories && <p>Loading categories...</p>}
            {categoriesError && <p style={{ color: 'red' }}>{categoriesError}</p>}
            {!loadingCategories && !categoriesError && categories.length === 0 && <p>No categories found.</p>}

            <div className="category-grid">
              {categories.map((cat, idx) => (
                <div
                  key={cat.id || idx}
                  className="category-card"
                  onClick={() => setSelectedCategory(cat)} // Set selected category on click
                >
                  <img
                    src={`${cat.image ? `http://localhost:3000/${cat.image}` : 'https://via.placeholder.com/300x200?text=No+Image'}`}
                    alt={cat.name}
                  />

                  <div className="category-info">
                    <p>{cat.products || 0} Products</p>
                    <h3>{cat.name}</h3>
                    <p>{cat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button
              className="back-btn"
              onClick={() => {
                setSelectedCategory(null); // Go back to categories view
                setShowForm(false); // Hide form when going back
              }}
            >
              &larr; Back
            </button>
            <h1>{selectedCategory.name}</h1>
            <p>
              {selectedCategory.description} • {selectedCategory.products || 0} products
            </p>
            <button className="add-product" onClick={() => setShowForm(!showForm)}>
              + Add Product
            </button>

            {showForm && (
              <div className="product-form">
                {/* ... (Product Form fields - unchanged) ... */}
                <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleInputChange} />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange}></textarea>
                <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                <div className="preview-gallery">
                  {formData.images.map((img, i) => (
                    <div key={i} className="preview-item">
                      <img src={URL.createObjectURL(img)} alt="preview" />
                      <button onClick={() => removeImage(i)}>Remove</button>
                    </div>
                  ))}
                </div>
                <button onClick={handleSubmit}>Submit Product</button>
              </div>
            )}

            {/* --- NEW: Display Products for the selected category --- */}
            <h3>Products in {selectedCategory.name}</h3>
            {loadingProducts && <p>Loading products for this category...</p>}
            {productsError && <p style={{ color: 'red' }}>{productsError}</p>}
            {!loadingProducts && !productsError && products.length === 0 && <p>No products found for this category.</p>}

            <div className="product-grid">
              {!loadingProducts && products.length > 0 && products.map((product) => (
                <div key={product.id} className="product-card">
                  {/* Assuming product.image is the path like 'uploads/product-image.jpg' */}
                  <img
                    src={`${product.image ? `http://localhost:3000/${product.image}` : 'https://via.placeholder.com/150x150?text=No+Product+Image'}`}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h3>{product.name} <span className="price">${product.price?.toFixed(2) || 'N/A'}</span></h3> {/* Use toFixed for price */}
                    <p>{product.description}</p>
                    {/* Display category name if available in product data */}
                    {product.category && <p>Category: {product.category.name}</p>}
                    <div className="actions">
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* --- END NEW PRODUCT DISPLAY --- */}

          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;