import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../pages/SingIn";

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SignIn" component={SignIn} options={{}} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
