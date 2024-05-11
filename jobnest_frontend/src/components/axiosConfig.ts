import axios, { AxiosInstance } from "axios";

export function getAxiosConfig(): AxiosInstance{
    const axiosConfig = axios.create({
        baseURL:"http://localhost:8000/"
    })
    const token : string | null = localStorage.getItem('token');
    console.log(token)
    if(token !== null){
        axiosConfig.defaults.headers.common["Authorization"]="Bearer "+localStorage.getItem("token");
    }
    return axiosConfig;
}