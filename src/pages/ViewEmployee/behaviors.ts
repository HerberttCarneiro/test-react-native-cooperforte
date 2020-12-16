import api from "../../services/api";
import { Toast } from "native-base";
import { ContactTypeValues } from "../../types/interfaces";

export function setIcon(type: number): string {
    switch (type) {
        case ContactTypeValues.HOME_PHONE:
            return "home";
        case ContactTypeValues.COMMERCIAL:
            return "phone";
        case ContactTypeValues.CELL_PHONE:
            return "smartphone";
        default:
            return "smartphone";
    }
}
export const deleteEmployee = async (id: number, goBack: Function) => {
    await api
        .delete(`/customers/${id}`)
        .then(() => {
            goBack()

            Toast.show({
                position: 'top',
                type: "success",
                text: "Deleted!",
            })
        })
        .catch((error) => {
            if (error.response.status == 500) return Toast.show({
                type: "danger",
                text: "Internal Server Error",
            });

            if (error.response.status == 400) return Toast.show({
                type: "danger",
                text: error.response.data.error,
            });

            Toast.show({
                type: "danger",
                text: "",
            })
        });
}
