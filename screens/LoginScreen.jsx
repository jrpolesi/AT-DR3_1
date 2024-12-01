import { Text, View } from "react-native";
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
    <View>
      <Text>Login</Text>

      <LoginForm onSubmit={handleLogin} />
    </View>
  );
}
