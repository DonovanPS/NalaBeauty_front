
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

export const createCategory = async (data) => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al crear categoria:', error);
    throw error;
  }
}

export const updateCategory = async (id, data) => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al actualizar categoria:', error);
    throw error;
  }
}