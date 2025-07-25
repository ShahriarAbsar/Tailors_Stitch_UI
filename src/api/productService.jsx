import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Your backend base URL

// Named export for the update function
export const updateProduct = async (id, updatedProductData) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }
    
    // The endpoint matches your API: PATCH /product/:id
    const response = await axios.patch(
      `${API_BASE_URL}/product/${id}`, 
      updatedProductData, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};