import { API } from "../_api"

// GET all products (tidak pakai Authorization)
export const getProduct = async () => {
    const { data } = await API.get("/products");
    return data.data;
};

// CREATE new product
export const createProduct = async (formData) => {
    try {
        const response = await API.post("/products", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error.response?.data || error.message);
        throw error;
    }
};

// SHOW a single product by ID (tidak pakai Authorization)
export const showProduct = async (id) => {
    const { data } = await API.get(`/products/${id}`);
    return data.data;
};

// UPDATE product by ID
export const updateProduct = async (id, formData) => {
    try {
        const response = await API.post(`/products/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error.response?.data || error.message);
        throw error;
    }
};

// DELETE product by ID
export const deleteProduct = async (id) => {
    try {
        await API.delete(`/products/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
    } catch (error) {
        console.error("Error deleting product:", error.response?.data || error.message);
        throw error;
    }
};
