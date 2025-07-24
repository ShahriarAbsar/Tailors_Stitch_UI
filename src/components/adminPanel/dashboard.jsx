import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed: npm install axios
import './Admin.scss'; // Ensure your SCSS file exists and is linked correctly

const AdminDashboard = ({ setAuthenticated }) => {
  // --- State for Categories ---
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  // --- State for Selected Category & Products ---
  const [selectedCategory, setSelectedCategory] = useState(null); // Stores the full category object
  const [products, setProducts] = useState([]); // Stores products for the selected category
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);

  // --- State for Product Add Form ---
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '', // Keep as string for input, parse before sending/displaying
    images: [] // Array of File objects for client-side preview
  });

  // Effect to Fetch Categories on Component Mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setCategoriesError(null);
        // Correct API URI for categories
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
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to Fetch Products when a Category is Selected
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (selectedCategory) { // Only run if a category is actually selected
        setLoadingProducts(true);
        setProductsError(null); // Clear previous product errors
        try {
          // Correct API URI for products, passing categoryId as a query parameter
          const response = await axios.get(`http://localhost:3000/product?categoryId=${selectedCategory.id}`);
          setProducts(response.data);
        } catch (err) {
          setProductsError(`Failed to fetch products for ${selectedCategory.name}.`);
          console.error('Error fetching products:', err);
        } finally {
          setLoadingProducts(false);
        }
      } else {
        setProducts([]); // Clear products if no category is selected (e.g., when going back)
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]); // Re-run this effect whenever `selectedCategory` changes

  // --- Handlers for Product Add Form ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Get File objects from input
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages }); // Corrected state update for images
  };

  const handleSubmit = () => {
    // In a real application, you would send formData to your product creation API
    console.log("Submitted Product:", formData);

    // Example of how you might send data (you'll need to adapt for file uploads)
    // const productData = new FormData();
    // productData.append('name', formData.name);
    // productData.append('description', formData.description);
    // productData.append('price', formData.price);
    // formData.images.forEach((image, index) => {
    //   productData.append(`images[${index}]`, image); // Adjust based on your backend's file upload DTO
    // });
    // try {
    //   await axios.post('http://localhost:3000/product', productData, {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    //   });
    //   alert('Product added successfully!');
    //   // Re-fetch products to update the list
    //   fetchProductsByCategory(); // Call the product fetch function
    //   setFormData({ name: '', description: '', price: '', images: [] });
    //   setShowForm(false);
    // } catch (error) {
    //   console.error('Error submitting product:', error);
    //   alert('Failed to add product.');
    // }

    // For now, just reset form and hide it
    setFormData({ name: '', description: '', price: '', images: [] });
    setShowForm(false);
  };

  // --- Logout Handler ---
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setAuthenticated(false); // Update parent authentication state
    window.location.href = '/'; // Redirect to home/login page
  };

  return (
    <div className="admin-container">
      {/* Sidebar Navigation */}
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

      {/* Main Content Area */}
      <main className="main-content">
        {!selectedCategory ? (
          // --- View: Product Categories Grid ---
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
                  key={cat.id || idx} // Use cat.id as unique key, fallback to idx
                  className="category-card"
                  onClick={() => setSelectedCategory(cat)} // Select category on click
                >
                  <img
                    // Construct full image URL from backend base URL and category image path
                    src={`${cat.image ? `http://localhost:3000/${cat.image}` : 'https://via.placeholder.com/300x200?text=No+Category+Image'}`}
                    alt={cat.name}
                  />
                  <div className="category-info">
                    {/* Assuming backend provides a 'products' count, otherwise display 0 */}
                    <p>{cat.products || 0} Products</p>
                    <h3>{cat.name}</h3>
                    <p>{cat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // --- View: Selected Category Details & Products List ---
          <div>
            <button
              className="back-btn"
              onClick={() => {
                setSelectedCategory(null); // Go back to categories view
                setShowForm(false); // Hide the add product form when navigating back
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

            {/* Product Add Form */}
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
                  placeholder="Price (e.g., 29.99)"
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

            {/* Products List for Selected Category */}
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
                    // Construct full image URL for product image
                    src={`${product.image ? `http://localhost:3000/${product.image}` : 'https://via.placeholder.com/150x150?text=No+Product+Image'}`}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h3>
                      {product.name}{' '}
                      <span className="price">
                        {/* Fix for `toFixed` error: parseFloat() before toFixed() */}
                        ${
                          product.price !== undefined && product.price !== null
                            ? parseFloat(product.price).toFixed(2)
                            : 'N/A'
                        }
                      </span>
                    </h3>
                    <p>{product.description}</p>
                    {/* Display category name if product data includes it (due to 'relations: ['category']' in backend) */}
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
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;