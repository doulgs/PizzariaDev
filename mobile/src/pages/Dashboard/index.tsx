import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo Pedido</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o Numero da Mesa"
        placeholderTextColor="#f0f0f0"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ABRIR MESA</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d2e",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 24,
  },
  input: {
    width: "90%",
    height: 60,
    backgroundColor: "#101026",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 22,
    color: "#FFF",
  },
  button: {
    width: "90%",
    height: 40,
    backgroundColor: "#3fffa3",
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#101026",
    fontWeight: "bold",
  },
});
