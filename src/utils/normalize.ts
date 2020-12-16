import { getInfoByCep } from "../services/viaCep";

export const cepNormalize = (value: string) => {
    value = onlyNumbers(value);
    let regex = /^([\d]{2})([\d]{3})([\d]{3})/;
    return value.replace(regex, "$1.$2-$3");
}

export const cpfNormalize = (value: string) => {
    value = onlyNumbers(value);
    let regex = /(\d{3})(\d{3})(\d{3})(\d{2})/;
    return value.replace(regex, "$1.$2.$3.$4");
}
export const phoneNormalize = (value: string) => {
    value = onlyNumbers(value);
    if (value.length > 8) {
        return value.replace(/^(\d{5})(\d{4}).*/, '$1-$2');
    }
    return value.replace(/^(\d{4})(\d{4}).*/, '$1-$2');
}

export const onlyNumbers = (value: string) => value.replace(/[^\d]/g, '')