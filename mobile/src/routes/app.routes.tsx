import React, { useContext } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Dashboard from "../pages/Dashboard";

import { AuthContext } from "../contexts/AuthContext";
import Order from "../pages/Order";
import FinishOrder from "../pages/FinishOrder";

export type StackPramsList = {
  Dashboard: undefined;
  Order: {
    number: number | string;
    order_id: string;
  };
  FinishOrder: {
    number: number | string;
    order_id: string;
  };
};

const Stack = createNativeStackNavigator<StackPramsList>();

function AppRoutes() {
  const { signOut } = useContext(AuthContext);

  function handleSignOut() {
    Alert.alert("Sair", "Deseja realmente sair?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => signOut() },
    ]);
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTintColor: "#FFF",
          headerStyle: { backgroundColor: "#1d1d2e" },
          headerRight: () => (
            <TouchableOpacity onPress={handleSignOut}>
              <Ionicons name="exit-outline" size={24} color="#ff3f4b" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FinishOrder"
        component={FinishOrder}
        options={{
          headerTitle: "Finalizando Pedido",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#1d1d2e",
          },
          headerTintColor: "#FAFAFA",
        }}
      />
    </Stack.Navigator>
  );
}

export default AppRoutes;
