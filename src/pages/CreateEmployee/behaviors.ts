import api from "../../services/api";
import { IFormEmployee } from "./types";
import { Toast } from "native-base";
import { useNavigation } from "@react-navigation/native";

export const createEmployee = async (formValues: IFormEmployee) => {
    try {
        await api
            .post("/customers", formValues);
        Toast.show({
            position: 'top',
            text: "Created!",
        });
    } catch (error) {
        console.log(Object.keys(error));

        console.log(error.response, 'error');

        if (error.response.status == 500)
            return Toast.show({
                type: "danger",
                text: "Internal Server Error",
            });
        if (error.response.status == 400)
            return Toast.show({
                type: "danger",
                text: error.response.data.error,
            });

        Toast.show({
            type: "danger",
            text: "Error",
        });
    }
}
