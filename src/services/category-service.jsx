
export const API_URL = import.meta.env.VITE_API_URL;

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obtener categorias:', error);
    throw error;
  }
};