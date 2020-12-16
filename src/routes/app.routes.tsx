import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Employees from "../pages/Employees";
import ViewEmployee from "../pages/ViewEmployee";
import { RootStackParamList } from "../types/interfaces";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import CreateEmployee from "../pages/CreateEmployee";
import { useAuth } from "../contexts/auth";
import EditEmployee from "../pages/EditEmployee";

const AppStack = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Employees"
        component={Employees}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateEmployee")}
            >
              <Icon style={{ marginLeft: 15 }} name="person-add"></Icon>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => signOut()}>
              <Icon style={{ marginRight: 15 }} name="exit"></Icon>
            </TouchableOpacity>
          ),
        })}
      />
      <AppStack.Screen
        name="CreateEmployee"
        component={CreateEmployee}
        options={{
          headerTitle: "Add Employee",
        }}
      />
      <AppStack.Screen
        name="EditEmployee"
        component={EditEmployee}
        options={{
          headerTitle: "Edit Employee",
        }}
      />
      <AppStack.Screen
        name="ViewEmployee"
        component={ViewEmployee}
        options={{
          headerTitle: "Employee",
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppRoutes;
