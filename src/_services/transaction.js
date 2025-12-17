import { API } from "../_api";

// GET all transactions
export const getTransactions = async () => {
  const { data } = await API.get("/transactions", {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return data.data;
};

export const createTransaction = async (payload) => {
  try {
    const response = await API.post("/transactions", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error.response?.data || error.message);
    throw error;
  }
};


// SHOW transaction by ID
export const showTransaction = async (id) => {
  const { data } = await API.get(`/transactions/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return data.data;
};

// UPDATE transaction by ID
export const updateTransaction = async (id, formData) => {
  try {
    // Sesuai Laravel, update pakai POST
    const response = await API.post(`/transactions/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error.response?.data || error.message);
    throw error;
  }
};

// DELETE transaction by ID
export const deleteTransaction = async (id) => {
  try {
    await API.delete(`/transactions/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    });
  } catch (error) {
    console.error("Error deleting transaction:", error.response?.data || error.message);
    throw error;
  }
};
