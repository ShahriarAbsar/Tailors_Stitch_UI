import React, { useState, useEffect } from 'react';
import './admin.scss'; // Import your SCSS for styling

const UpdateProductModal = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  // Use useEffect to automatically populate the form fields
  // whenever the `product` prop is changed.
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the parent's onSave function, passing the product's ID and the form data
    onSave(product.id, formData);
  };

  return (
    <div className="modal-overlay"> {/* A div for the modal background */}
      <div className="modal-content">
        <h2>Edit Product: {product.name}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            className="admin-input"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="admin-input"
          ></textarea>
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="admin-input"
          />
          {/* You can add file inputs here to handle image updates later */}

          <div className="form-actions">
            <button type="submit" className="add-product">Save Changes</button>
            <button type="button" onClick={onClose} className="back-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;