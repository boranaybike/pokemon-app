import axios from "axios";
const API_URL = "https://pokeapi.co/api/v2/pokemon";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (request: any) => {
    return request;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
export const getPokeList = () => {
  return axiosInstance.get(API_URL);
};

export const getPokeDetails = (id: number) => {
  return axiosInstance.get(`${API_URL}/${id}`);
};
