import axios from "axios"

// const url = "https://backend-kelompokfwd9-sibm3.karyakreasi.id";
const url = "https://sitaniberdampak.cloud";

export const API = axios.create({
    baseURL: `${url}/api`,

})


export const productImageStorage = `${url}/storage/products`;
