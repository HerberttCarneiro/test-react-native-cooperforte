import { RootStackParamList, Employee } from "../../types/interfaces";
import { RouteProp } from "@react-navigation/native";

export type ProfileScreenRouteProp = RouteProp<RootStackParamList, "ViewEmployee">;

export type ParamList = {
    Employee: Employee
};

export type PropsViewEmployee = {
    route: ProfileScreenRouteProp;
};