
export const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {

  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obtener productos:', error);
    throw error;
  }
};


export const createProduct = async (product) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
}