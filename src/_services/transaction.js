import api from "../_api";

export const getTransactions = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.warn("⚠️ User not logged in — transaction API skipped.");
    return [];
  }

  try {
    const { data } = await api.get("/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    throw error;
  }
};

export const createTransactions = async (formData) => {
  const { data } = await api.post("/transactions", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  });

  return data.data;
};

export const updateTransactions = async (id, formData) => {
  const { data } = await api.put(`/transactions/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  });

  return data.data;
};

export const deleteTransactions = async (id) => {
  const { data } = await api.delete(`/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return data.data;
};
