import "react-native-gesture-handler";

import React from "react";
import { Root } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/auth";
import Routes from "./src/routes";
import allReducers from "./src/reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { YellowBox, SafeAreaView } from "react-native";

YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested", // TODO: Remove when fixed
]);

const store = createStore(allReducers);
const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Root>
        <NavigationContainer>
          <AuthProvider>
            <Provider store={store}>
              <Routes />
            </Provider>
          </AuthProvider>
        </NavigationContainer>
      </Root>
    </SafeAreaView>
  );
};

export default App;
