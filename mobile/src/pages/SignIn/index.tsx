import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function SignIn() {
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const { signIn, loadingAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email === "" || password === "") {
      return onToggleSnackBar();
    }
    await signIn({ email, password });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite seu Email"
          style={styles.input}
          placeholderTextColor="#f0f0f0"
          autoCapitalize="none"
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          placeholder="Digite sua Senha"
          style={styles.input}
          placeholderTextColor="#f0f0f0"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={(e) => setPassword(e)}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={25} color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>
      </View>

      <Snackbar
        duration={3000}
        style={{
          marginBottom: 30,
          marginHorizontal: 30,
          backgroundColor: "#101026",
          borderRadius: 8,
        }}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Fechar",
        }}
      >
        Dados de Login Invalidos
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d2e",
  },
  logo: {
    marginBottom: 18,
  },
  inputContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  input: {
    width: "95%",
    height: 40,
    backgroundColor: "#101026",
    marginBottom: 12,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "#fff",
  },
  button: {
    width: "95%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3fffa3",
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#101026",
  },
});
