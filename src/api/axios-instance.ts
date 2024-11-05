import axios, { Axios, AxiosInstance } from 'axios';
import { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';

const useApi = (): AxiosInstance  => {
  const context = useContext(UserContext)
  const { accessToken } = context

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
  }); 

  if (!accessToken) return axiosInstance

  axiosInstance.interceptors.request.use(
    config => {
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return axiosInstance
}



export default useApi;
