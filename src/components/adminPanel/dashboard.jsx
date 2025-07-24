import React, { useState, useEffect } from "react";
import axios from "axios";
import './Admin.scss';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ setAuthenticated }) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('categories');

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);

  const [showProductFormModal, setShowProductFormModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    images: []
  });
  const [formSubmitError, setFormSubmitError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setCategoriesError(null);
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
  }, []);

  const fetchProductsByCategory = async () => {
    if (selectedCategory) {
      setLoadingProducts(true);
      setProductsError(null);
      try {
        const response = await axios.get(`http://localhost:3000/product?categoryId=${selectedCategory.id}`);
        setProducts(response.data);
      } catch (err) {
        setProductsError(`Failed to fetch products for ${selectedCategory.name}.`);
        console.error('Error fetching products:', err);
      } finally {
        setLoadingProducts(false);
      }
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
  }, [selectedCategory]);

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

  const handleProductSubmit = async () => {
    if (!selectedCategory) {
      setFormSubmitError("Please select a category before adding a product.");
      return;
    }
    if (!formData.name || !formData.description || !formData.price || formData.images.length === 0) {
      setFormSubmitError("Please fill all product fields and upload at least one image.");
      return;
    }

    setFormSubmitError(null);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      setFormSubmitError("Authentication token not found. Please log in again.");
      setAuthenticated(false);
      navigate('/login');
      return;
    }

    const productPayload = new FormData();
    productPayload.append('name', formData.name);
    productPayload.append('description', formData.description);
    productPayload.append('price', formData.price);
    productPayload.append('categoryId', selectedCategory.id.toString());

    formData.images.forEach((imageFile) => {
      productPayload.append('images', imageFile);
    });

    try {
      await axios.post('http://localhost:3000/product', productPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      alert('Product added successfully!');
      setFormData({ name: '', description: '', price: '', images: [] });
      setShowProductFormModal(false);
      fetchProductsByCategory();

    } catch (error) {
      console.error('Error submitting product:', error.response?.data || error.message);
      setFormSubmitError(error.response?.data?.message || 'Failed to add product. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setAuthenticated(false);
    navigate('/login');
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedCategory(null);
    setShowProductFormModal(false);
    setFormSubmitError(null);
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h1>Dashboard Overview</h1>
            <p>Welcome to your admin dashboard. Use the sidebar to navigate.</p>
          </div>
        );
      case 'categories':
        return (
          <div>
            <h1>Product Categories</h1>
            {loadingCategories && <p>Loading categories...</p>}
            {categoriesError && <p style={{ color: 'red' }}>{categoriesError}</p>}
            {!loadingCategories && !categoriesError && categories.length === 0 && (
              <p>No categories found. Add some from the backend!</p>
            )}

            <div className="category-grid">
              {categories.map((cat, idx) => (
                <div
                  key={cat.id || idx}
                  className="category-card"
                  onClick={() => setSelectedCategory(cat)}
                >
                  <img
                    src={`${cat.image ? `http://localhost:3000/${cat.image}` : 'https://via.placeholder.com/300x200?text=No+Category+Image'}`}
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
        );
      case 'allProducts':
        return (
          <div>
            <h1>All Products</h1>
            <p>This section will display all products across all categories.</p>
            <div className="product-grid">
                <p>All products list coming soon!</p>
                <div className="product-card">
                    <div className="image-placeholder">No Image</div>
                    <div className="product-details">
                        <h3>Global Product <span className="price">$99.99</span></h3>
                        <p>Description of a global product.</p>
                        <div className="actions">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h1>Settings</h1>
            <p>Manage your admin panel settings here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Tailor Stitch Admin</h2>
        <nav>
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => handleTabChange('dashboard')}>Dashboard</button>
          <button className={activeTab === 'categories' ? 'active' : ''} onClick={() => handleTabChange('categories')}>Categories</button>
          <button className={activeTab === 'allProducts' ? 'active' : ''} onClick={() => handleTabChange('allProducts')}>All Products</button>
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => handleTabChange('settings')}>Settings</button>
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
        {selectedCategory && activeTab === 'categories' ? (
          <div>
            <button
              className="back-btn"
              onClick={() => {
                setSelectedCategory(null);
                setShowProductFormModal(false);
              }}
            >
              &larr; Back to Categories
            </button>
            <h1>{selectedCategory.name}</h1>
            <p>
              {selectedCategory.description} • {selectedCategory.products || 0} products
            </p>
            <button
              className="add-product"
              onClick={() => setShowProductFormModal(true)}
            >
              + Add Product
            </button>

            <Dialog
              header={`Add Product to ${selectedCategory.name}`}
              visible={showProductFormModal}
              style={{ width: '50vw', maxWidth: '600px' }}
              onHide={() => {
                setShowProductFormModal(false);
                setFormData({ name: '', description: '', price: '', images: [] });
                setFormSubmitError(null);
              }}
              modal
            >
              <div className="product-form" style={{ padding: '20px' }}>
                {formSubmitError && <p style={{ color: 'red', marginBottom: '15px' }}>{formSubmitError}</p>}

                <div style={{ marginBottom: '15px' }}>
                  <label htmlFor="productName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Product Name:</label>
                  <input
                    id="productName"
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="admin-input"
                  />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label htmlFor="productDescription" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
                  <textarea
                    id="productDescription"
                    name="description"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="admin-input"
                  ></textarea>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label htmlFor="productPrice" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Price:</label>
                  <input
                    id="productPrice"
                    type="text"
                    name="price"
                    placeholder="e.g., 29.99"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="admin-input"
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="productImages" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Upload Images:</label>
                  <input
                    id="productImages"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="admin-input"
                    style={{ padding: '8px' }}
                  />
                </div>

                <div className="preview-gallery" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                  {formData.images.map((img, i) => (
                    <div key={i} className="preview-item" style={{ position: 'relative', border: '1px solid #ddd', padding: '5px', borderRadius: '4px' }}>
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${i}`}
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '2px' }}
                      />
                      <button
                        onClick={() => removeImage(i)}
                        style={{
                          position: 'absolute',
                          top: '0px',
                          right: '0px',
                          background: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          lineHeight: '1',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleProductSubmit}
                  className="btnn"
                  style={{ backgroundColor: '#28a745', width: '100%' }}
                >
                  Submit Product
                </button>
              </div>
            </Dialog>

            <h3>Products in {selectedCategory.name}</h3>
            {loadingProducts && <p>Loading products for this category...</p>}
            {productsError && <p style={{ color: 'red' }}>{productsError}</p>}
            {!loadingProducts && !productsError && products.length === 0 && (
              <p>No products found for this category. Use the "+ Add Product" button to add one!</p>
            )}

            <div className="product-grid">
              {!loadingProducts && products.length > 0 && products.map((product) => (
                <div key={product.id} className="product-card">
                  <img
                    // --- UPDATED LINE HERE ---
                    // Check if product.images exists and has at least one element
                    src={`${product.images && product.images.length > 0 ? `http://localhost:3000/${product.images[0]}` : 'https://via.placeholder.com/150x150?text=No+Product+Image'}`}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h3>
                      {product.name}{' '}
                      <span className="price">
                        ${
                          product.price !== undefined && product.price !== null
                            ? parseFloat(product.price).toFixed(2)
                            : 'N/A'
                        }
                      </span>
                    </h3>
                    <p>{product.description}</p>
                    {product.category && <p>Category: {product.category.name}</p>}
                    <div className="actions">
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          renderMainContent()
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;