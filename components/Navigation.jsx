import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { useAuthContext } from "../contexts/Auth.jsx";
import { LoginScreen } from "../screens/LoginScreen.jsx";
import { TransacaoFormScreen } from "../screens/TransacaoFormScreen.jsx";
import { TransacaoListScreen } from "../screens/TransacaoListScreen.jsx";
import { getRandomId } from "../utils/getRandomId.js";

const stackNavigator = createStackNavigator();

export function Navigation() {
  const [transacoes, setTransacoes] = useState([]);

  const { isAuth } = useAuthContext();

  function handleCreate(value) {
    setTransacoes([...transacoes, { id: getRandomId(), ...value }]);
  }

  function handleRemove(id) {
    setTransacoes((prev) => prev.filter((item) => item.id !== id));
  }

  function handleUpdate(value) {
    setTransacoes((prev) =>
      prev.map((item) => {
        if (item.id === value.id) {
          return value;
        }
        return item;
      })
    );
  }

  return (
    <NavigationContainer>
      <stackNavigator.Navigator>
        {isAuth ? (
          <>
            <stackNavigator.Screen
              name="TransacaoList"
              options={{
                title: "Transações",
              }}
            >
              {(props) => (
                <TransacaoListScreen
                  transacoes={transacoes}
                  onRemove={handleRemove}
                  {...props}
                />
              )}
            </stackNavigator.Screen>
            <stackNavigator.Screen
              name="TransacaoForm"
              options={{
                title: "Formulário de Transação",
              }}
            >
              {(props) => (
                <TransacaoFormScreen
                  transacoes={transacoes}
                  onCreate={handleCreate}
                  onUpdate={handleUpdate}
                  {...props}
                />
              )}
            </stackNavigator.Screen>
          </>
        ) : (
          <stackNavigator.Screen
            name="Login"
            options={{
              title: "Login",
            }}
            component={LoginScreen}
          />
        )}
      </stackNavigator.Navigator>
    </NavigationContainer>
  );
}
