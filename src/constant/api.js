import axios from 'axios';

const getProducts = async (category) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/products/');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Propagate the error to the calling code
  }
};

export { getProducts };