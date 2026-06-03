import axios from "axios"

// const url = "https://backend-kelompokfwd9-sibm3.karyakreasi.id";
const url = "https://lemonchiffon-clam-750306.hostingersite.com/";

export const API = axios.create({
    baseURL: `${url}/api`,

})


export const productImageStorage = `${url}/storage/products`;
