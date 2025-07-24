import React, { useState } from 'react';
import './Admin.scss';
const UploadForm = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct({ ...product, image: URL.createObjectURL(files[0]) });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Submitted:', product);
    // Store in local state / backend if available
  };

  return (
    <form className='uploadForm' onSubmit={handleSubmit} >
      <input
        type="text"
        name="title"
        placeholder="Product Title"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Product Description"
        onChange={handleChange}
        required
      ></textarea>
      <input type="file" name="image" accept="image/*" onChange={handleChange} />
      <button className='btnn' type="submit">Upload Product</button>

      {product.image && (
        <div style={{ marginTop: '20px' }}>
          <h4>Preview:</h4>
          <img src={product.image} alt="Preview" width="200" />
        </div>
      )}
    </form>
  );
};

export default UploadForm;
