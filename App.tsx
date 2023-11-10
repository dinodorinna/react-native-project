import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import Login from "./src/components/login/pages/login";
import { SWRConfig } from "swr";
import { fetcher } from "./src/utils/fetcher";
import Register from "./src/components/login/pages/register";
import Food from "./src/components/feed/pages/food";

export type RootStackParamList = {
  Home: undefined;
  Setting: { userId: string };
  Login: undefined;
  Register: undefined;
  Food: undefined;
  Feed: undefined;
  Subscribes: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SWRConfig value={{ fetcher }}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Food">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Food" component={Food} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SWRConfig>
  );
}
