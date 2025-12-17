import axios from "axios"

// const url = "https://backend-kelompokfwd9-sibm3.karyakreasi.id";
const url = "http://127.0.0.1:8000";

export const API = axios.create({
    baseURL: `${url}/api`,

})


export const productImageStorage = `${url}/storage/products`;
