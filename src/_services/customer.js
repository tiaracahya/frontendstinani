import { API } from "../_api";

export const getCustomer = async () => {
    const { data } = await API.get("/customers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    });
    return data.data; // ambil array customer
};

export const createCustomer = async (formData) => {
    const response = await API.post("/customers", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
    return response.data; // ambil object data
};

export const showCustomer = async (id) => {
    const { data } = await API.get(`/customers/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    });
    return data.data;
};

export const updateCustomer = async (id, formData) => {
    const response = await API.post(`/customers/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
    return response.data;
};

export const deleteCustomer = async (id) => {
    await API.delete(`/customers/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    });
};
