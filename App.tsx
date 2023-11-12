import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Appbar,
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import Login from "./src/components/login/pages/login";
import { SWRConfig } from "swr";
import { fetcher } from "./src/utils/fetcher";
import Register from "./src/components/login/pages/register";
import Main from "./src/components/feed/pages/main";
import AddManga from "./src/components/feed/pages/addManga";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
  Feed: undefined;
  Subscribes: undefined;
  AddNewManga: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SWRConfig value={{ fetcher }}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
              header: (prop) => (
                <Appbar.Header>
                  {prop.back && (
                    <Appbar.BackAction
                      onPress={() => prop.navigation.goBack()}
                    />
                  )}
                  <Appbar.Content title={prop.route.name} />
                </Appbar.Header>
              ),
            }}
          >
            <Stack.Group>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Register"
                component={Register}
              />
              <Stack.Screen name="Main" component={Main} />
            </Stack.Group>

            <Stack.Group
              screenOptions={{
                presentation: "containedModal",
              }}
            >
              <Stack.Screen name="AddNewManga" component={AddManga} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SWRConfig>
  );
}
