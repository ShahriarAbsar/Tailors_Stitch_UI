import React, { useState, useEffect } from "react";
import axios from "axios";
import './Admin.scss';

const AdminDashboard = ({ setAuthenticated }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
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
        const response = await axios.get('http://localhost:3000/category'); // Correct API URI
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories. Please try again.');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // --- Form Handling (remains largely the same) ---
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
    setFormData({ name: '', description: '', price: '', images: [] });
    setShowForm(false);
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
            {loading && <p>Loading categories...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && categories.length === 0 && <p>No categories found.</p>}

            <div className="category-grid">
              {categories.map((cat, idx) => (
                <div
                  key={cat.id || idx}
                  className="category-card"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {/* THIS IS THE ONLY IMG TAG YOU NEED */}
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
              onClick={() => setSelectedCategory(null)}
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
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
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
            <h3>Products in {selectedCategory.name}</h3>
            <div className="product-grid">
                <p>No products displayed for this category yet.</p>
                <div className="product-card">
                    <div className="image-placeholder">No Image</div>
                    <div className="product-details">
                        <h3>Sample Product <span className="price">$19.99</span></h3>
                        <p>Description of sample product.</p>
                        <div className="actions">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;