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
  const [transacoes, setTransacoes] = useState([
    {
      id: "adfafaf",
      descricao: "Adfadf",
      valor: {
        original: 413,
        BRL: 2199.4728,
      },
      data: new Date("2024-12-01T18:26:37.731Z"),
      hora: new Date("2024-12-01T18:26:37.731Z"),
      categoria: {
        label: "Outros",
        key: "outros",
      },
      tipo: {
        label: "Receita",
        key: "income",
      },
      moeda: {
        label: "Euro",
        key: "EUR",
      },
    },
  ]);

  const { isAuth } = useAuthContext();

  return (
    <NavigationContainer>
      <stackNavigator.Navigator>
        {isAuth ? (
          <>
            <stackNavigator.Screen name="TransacaoList">
              {(props) => (
                <TransacaoListScreen
                  transacoes={transacoes}
                  onRemove={(id) =>
                    setTransacoes((prev) =>
                      prev.filter((item) => item.id !== id)
                    )
                  }
                  {...props}
                />
              )}
            </stackNavigator.Screen>
            <stackNavigator.Screen name="TransacaoForm">
              {(props) => (
                <TransacaoFormScreen
                  transacoes={transacoes}
                  onCreate={(value) =>
                    setTransacoes([
                      ...transacoes,
                      { id: getRandomId(), ...value },
                    ])
                  }
                  onUpdate={(value) =>
                    setTransacoes((prev) =>
                      prev.map((item) => (item.id === value.id ? value : item))
                    )
                  }
                  {...props}
                />
              )}
            </stackNavigator.Screen>
          </>
        ) : (
          <stackNavigator.Screen name="Login" component={LoginScreen} />
        )}
      </stackNavigator.Navigator>
    </NavigationContainer>
  );
}
