import React, { useState, useEffect } from "react";
import axios from "axios";
import './Admin.scss';
import EditProductModal from "./EditProductModal"; // Assuming this is now in the same directory
import { updateProduct } from "../../api/productService"; // Assuming this is one level up and in an 'api' directory

const AdminDashboard = ({ setAuthenticated }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

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

  // --- NEW: States for the Update feature ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

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
  }, []);

  // --- API Integration: Fetch Products when selectedCategory changes ---
  const fetchProductsByCategory = async (categoryId) => {
    setLoadingProducts(true);
    setProductsError(null);
    try {
      const response = await axios.get(`http://localhost:3000/product?categoryId=${categoryId}`);
      setProducts(response.data);
    } catch (err) {
      setProductsError(`Failed to fetch products for this category.`);
      console.error('Error fetching products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory.id);
    } else {
      setProducts([]);
    }
  }, [selectedCategory]);

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

  // --- NEW: Handlers for the Edit feature ---
  const handleEditClick = (product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      const updatedProduct = await updateProduct(id, updatedData);
      
      // Update the product list in the state to reflect the change
      setProducts(products.map(p => p.id === id ? updatedProduct : p));

      setIsEditModalOpen(false); // Close the modal
      setProductToEdit(null); // Clear the product being edited
      console.log('Product updated successfully:', updatedProduct);
      
    } catch (error) {
      console.error('Failed to update product:', error);
      // You can add a state here to show an error message to the user
    }
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
                  onClick={() => setSelectedCategory(cat)}
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
                setSelectedCategory(null);
                setShowForm(false);
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
                <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleInputChange} />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange}></textarea>
                <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                <div className="preview-gallery">
                  {formData.images.map((img, i) => (
                    <div key={i} className="preview-item">
                      <img className="preview" src={URL.createObjectURL(img)} alt="preview" />
                      <button onClick={() => removeImage(i)}>Remove</button>
                    </div>
                  ))}
                </div>
                <button onClick={handleSubmit}>Submit Product</button>
              </div>
            )}

            <h3>Products in {selectedCategory.name}</h3>
            {loadingProducts && <p>Loading products for this category...</p>}
            {productsError && <p style={{ color: 'red' }}>{productsError}</p>}
            {!loadingProducts && !productsError && products.length === 0 && <p>No products found for this category.</p>}

            <div className="product-grid">
              {!loadingProducts && products.length > 0 && products.map((product) => (
                <div key={product.id} className="product-card">
                  <img 
                    src={`${product.image ? `http://localhost:3000/${product.image}` : 'https://via.placeholder.com/150x150?text=No+Product+Image'}`}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h3>{product.name} <span className="price">${product.price?.toFixed(2) || 'N/A'}</span></h3>
                    <p>{product.description}</p>
                    {product.category && <p>Category: {product.category.name}</p>}
                    <div className="actions">
                      {/* NEW: OnClick handler for the Edit button */}
                      <button onClick={() => handleEditClick(product)}>Edit</button>
                      <button>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* NEW: Render the EditProductModal when a product is being edited */}
      {isEditModalOpen && productToEdit && (
        <EditProductModal
          product={productToEdit}
          onSave={handleUpdateProduct} // This handler calls the API
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;