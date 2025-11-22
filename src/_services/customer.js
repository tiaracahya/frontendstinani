import api from "../_api";

// 📦 Get all products
export const getCustomers = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.warn("⚠️ User not logged in — product API skipped.");
    return []; 
  }

  try {
    const { data } = await api.get("/sales", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return data.data;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    throw error;
  }
};

export const createCustomer = async (formData) => {
  const { data } = await api.post("/sales", formData, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json"
    }
  });

  return data.data;
};

export const updateCustomer = async (id, formData) => {
  const { data } = await api.post(`/sales/${id}`, formData, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json"
    }
  });

  return data.data;
};

export const deleteCustomer = async (id) => {
  const { data } = await api.delete(`/sales/${id}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
    }
  });

  return data.data;
};
