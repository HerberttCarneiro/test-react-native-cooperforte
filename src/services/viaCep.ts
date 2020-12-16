import { onlyNumbers } from "../utils/normalize";
import api from "./api";

export interface Address {
    uf: string;
    logradouro: string;
    localidade: string;
    bairro: string;
}

export const getInfoByCep = async (cep: string): Promise<Address> => {
    cep = onlyNumbers(cep)
    return api.get(`https://viacep.com.br/ws/${cep}/json/`,)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            throw new Error("Ocorreu um erro ao buscar o CEP!");
        });
}