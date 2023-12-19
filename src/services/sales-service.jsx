export const API_URL = import.meta.env.VITE_API_URL;

export const getSales = async () => {

    try {
        const response = await fetch(`${API_URL}/sales`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error obtener ventas:', error);
        throw error;
    }
}

export const createSale = async (sale) => {

    try {
        const response = await fetch(`${API_URL}/sales`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sale),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear venta:', error);
        throw error;
    }
};

export const getStatisticsMonth = async (month) => {
    try {
        const response = await fetch(`${API_URL}/sales/statistics/${month}`);
        const data = await response.json();
        return data;
    }catch (error) {
        console.error('Error obtener ventas:', error);
        throw error;
      
    }
}


export const getSalesByDate = async (date) => {
    try {
        const response = await fetch(`${API_URL}/sales/byDate/${date}`);
        const data = await response.json();
        return data;
    }catch (error) {
        console.error('Error obtener ventas:', error);
        throw error;
      
    }
}