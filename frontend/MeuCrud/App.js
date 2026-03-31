import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen";
import ParedaoScreen from "./src/screens/ParedaoScreen";
import AddEditScreen from "./src/screens/AddEditScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0D0D0D" }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false, // Custom headers (there were some issues with default on my phone)
              animation: "slide_from_right",
              contentStyle: { backgroundColor: "#0D0D0D" },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />

            <Stack.Screen name="Paredao" component={ParedaoScreen} />

            <Stack.Screen
              name="AddEdit"
              component={AddEditScreen}
              options={{ animation: "slide_from_bottom" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
