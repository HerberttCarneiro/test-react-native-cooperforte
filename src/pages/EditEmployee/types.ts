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
    id: number;
    fullName: string;
    currentPosition: string;
    company: string;
    contacts: Contact[],
    experiences: Experience[],
    emails: email[],
}