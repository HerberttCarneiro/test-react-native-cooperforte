import Employees from "../pages/Employees";
import CreateEmployee from "../pages/CreateEmployee";
import ViewEmployee from "../pages/ViewEmployee";
import EditEmployee from "../pages/EditEmployee";

export interface AuthContextData {
    signed: boolean;
    user: User | null;
    signIn(login: string, password: string): Promise<void>;
    signOut(): void;
    loading: boolean;
}

export interface SignInResponse {
    access_token: string;
    user: User;
}

export interface User {
    username: string;
}

export interface Experience {
    id?: number;
    name: string
}

export interface Email {
    id?: number;
    value: string
}

export interface Contact {
    id?: number;
    value: string;
    contactType: ContactType
}
export interface ContactType {
    id: number;
    name: string
}

export interface Employee {
    id: number,
    name: string,
    cpf: string,
    city: string,
    state: string,
    cep: string,
    address: string,
    district: string,
    contacts: Contact[],
    experiences: Experience[],
    emails: Email[],
}

export type RootStackParamList = {
    Employees: typeof Employees;
    CreateEmployee: typeof CreateEmployee;
    ViewEmployee: typeof ViewEmployee;
    EditEmployee: typeof EditEmployee;
};

export class ContactTypeValues {
    public static HOME_PHONE = 1;
    public static COMMERCIAL = 2;
    public static CELL_PHONE = 3;
}