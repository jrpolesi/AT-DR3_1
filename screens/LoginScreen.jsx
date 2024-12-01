import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoginForm } from "../components/LoginForm.jsx";
import { useAuthContext } from "../contexts/Auth.jsx";

export function LoginScreen() {
  const { login } = useAuthContext();

  function handleLogin(value) {
    console.log(`Usuário: ${value.username} autenticado com sucesso!`);

    if (value.username && value.password) {
      login();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App</Text>
      <Text style={styles.description}>
        Por favor, insira seu nome de usuário e senha para fazer login.
      </Text>

      <LoginForm onSubmit={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    marginHorizontal: 22,
  },
});
