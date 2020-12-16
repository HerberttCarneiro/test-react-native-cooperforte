export const required = (value: any) => (value ? undefined : 'Obrigatório')

export const norequired = (value: any) => (value ? undefined : undefined)

export const maxLength = (max: number) => (value: string | any[]) =>
    value && value.length > max
        ? `Deve ter ${max} caracteres ou menos`
        : undefined

export const minLength = (min: number) => (value: string | any[]) =>
    value && value.length < min ? `Deve ter ${min} caracteres ou mais` : undefined

export const email = (value: string) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Endereço de email inválido'
        : undefined

export const placa = (value: string) =>
    value && !/^[a-zA-Z]{3}[0-9]{1}[A-Z0-9]{1}[0-9]{2}$/i.test(value)
        ? 'Placa inválida'
        : undefined

export const alphaNumeric = (value: string) =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Apenas valores alfanumérico'
        : undefined

export const isNumeric = (value: number | undefined) =>
    value == undefined || (!isNaN(Number(value)) && isFinite(value))
        ? undefined
        : 'Apenas valores númericos'

export const phone = (value: string | any[]) =>
    value && value.length < 15 ? `Deve ter 9 números` : undefined

export const cpf = (value: string | any[]) =>
    value && value.length < 14 ? `Deve ter 11 números` : undefined

export const cep = (value: string | any[]) =>
    value && value.length < 10 ? `Deve ter 8 números` : undefined

export const minLength4 = minLength(4)
export const minLength6 = minLength(6)
export const minLength7 = minLength(7)
export const maxLength15 = maxLength(15)
export const maxLength7 = maxLength(7)
