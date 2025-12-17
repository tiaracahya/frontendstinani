import { API } from "../_api"

// GET all expenses
export const getExpenses = async () => {
    const { data } = await API.get("/expenses", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    });

    return data.data;
};

// CREATE new expense
export const createExpenses = async (formData) => {
    try {
        const response = await API.post("/expenses", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating expense:", error.response?.data || error.message);
        throw error;
    }
};

// SHOW a single expense by ID
export const showExpenses = async (id) => {
    const { data } = await API.get(`/expenses/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
    });

    return data.data;
};

// UPDATE expense by ID
export const updateExpenses = async (id, formData) => {
    try {
        const response = await API.post(`/expenses/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating expense:", error.response?.data || error.message);
        throw error;
    }
};

// DELETE expense by ID
export const deleteExpenses = async (id) => {
    try {
        await API.delete(`/expenses/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
    } catch (error) {
        console.error("Error deleting expense:", error.response?.data || error.message);
        throw error;
    }
};
