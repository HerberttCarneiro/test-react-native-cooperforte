import { SignInResponse } from "../types/interfaces";
import api from "./api";

export const signIn = async (username: string, password: string) => {

    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
    var config = {
        headers: {
            'Authorization': `Basic ${token}`
        },
    };

    const response = await api
        .get("/customers", config).catch(error => {
            console.log(error);

        })


}
export default signIn;