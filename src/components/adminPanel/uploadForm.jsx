import React, { useState } from "react";
import './admin.scss'

const categories = [
  {
    name: "Formal Shirts",
    description:
      "Professional formal shirts for business and special occasions",
    products: 15,
    image: "https://via.placeholder.com/300x200?text=Formal+Shirts",
  },
  {
    name: "Casual Shirts",
    description: "Comfortable casual shirts for everyday wear",
    products: 23,
    image: "https://via.placeholder.com/300x200?text=Casual+Shirts",
  },
  {
    name: "Suits",
    description: "Premium tailored suits for formal events",
    products: 8,
    image: "https://via.placeholder.com/300x200?text=Suits",
  },
  {
    name: "Pants",
    description: "High-quality pants and trousers",
    products: 31,
    image: "https://via.placeholder.com/300x200?text=Pants",
  },
  {
    name: "Blazers",
    description: "Stylish blazers for semi-formal occasions",
    products: 12,
    image: "https://via.placeholder.com/300x200?text=Blazers",
  },
  {
    name: "Accessories",
    description: "Ties, cufflinks, and other fashion accessories",
    products: 27,
    image: "https://via.placeholder.com/300x200?text=Accessories",
  },
];

const uploadForm = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    images: []
  });

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
    // Here you can handle your product submission logic
    console.log("Submitted Product:", formData);
    setFormData({ name: '', description: '', price: '', images: [] });
    setShowForm(false);
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
            <div className="category-grid">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="category-card"
                  onClick={() => setSelectedCategory(cat)}
                >
                  <img src={cat.image} alt={cat.name} />
                  <div className="category-info">
                    <p>{cat.products} Products</p>
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
              {selectedCategory.description} • {selectedCategory.products} products
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
          </div>
        )}
      </main>
    </div>
  );
};

export default uploadForm;
