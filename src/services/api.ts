import axios from 'axios';
import { Toast } from 'native-base';

const api = axios.create({
    baseURL: 'http://localhost:8080/'
})


export const get = () => {
}

export const post = async (url: string, data: FormData) => {
    await api
        .post("/employees", data)
        .then(() => {
            Toast.show({
                type: "success",
                text: "Success",
            })
        })
        .catch((error) => {
            Toast.show({
                type: "danger",
                text: error.response.data.error_description || "Não foi possível listar",
            })
        });
}

export default api;