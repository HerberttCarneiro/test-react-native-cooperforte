import { RootStackParamList, Employee, Contact, Experience, email } from "../../types/interfaces";
import { RouteProp } from "@react-navigation/native";

export type ProfileScreenRouteProp = RouteProp<RootStackParamList, "ViewEmployee">;

export type ParamList = {
    Employee: Employee
};

export type PropsViewEmployee = {
    route: ProfileScreenRouteProp;
};

export interface IFormEmployee {
    name: string;
    cpf: string;
    cep: string;
    address: string;
    district: string;
    city: string;
    state: string;
    contacts: Contact[],
    emails: email[],
}