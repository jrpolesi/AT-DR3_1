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
    {
      id: "aaaaa",
      descricao: "iaundia ndviau vianvdiandv iuan vian divua nd",
      valor: {
        original: 300.78,
        BRL: 499.4728,
      },
      data: new Date("2023-12-01T18:26:37.731Z"),
      hora: new Date("2023-12-01T18:30:37.731Z"),
      categoria: {
        label: "Saúde",
        key: "saude",
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
    {
      id: "33rv3",
      descricao: "iaundia ndviau vianvdiandv iuan vian divua nd",
      valor: {
        original: 300.78,
        BRL: 499.4728,
      },
      data: new Date("2023-12-01T18:26:37.731Z"),
      hora: new Date("2023-12-01T18:30:37.731Z"),
      categoria: {
        label: "Saúde",
        key: "saude",
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
    {
      id: "9h99fw",
      descricao: "iaundia ndviau vianvdiandv iuan vian divua nd",
      valor: {
        original: 300.78,
        BRL: 499.4728,
      },
      data: new Date("2023-12-01T18:26:37.731Z"),
      hora: new Date("2023-12-01T18:30:37.731Z"),
      categoria: {
        label: "Saúde",
        key: "saude",
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
    {
      id: "fjnof38hf",
      descricao: "iaundia ndviau vianvdiandv iuan vian divua nd",
      valor: {
        original: 300.78,
        BRL: 499.4728,
      },
      data: new Date("2023-12-01T18:26:37.731Z"),
      hora: new Date("2023-12-01T18:30:37.731Z"),
      categoria: {
        label: "Saúde",
        key: "saude",
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
    {
      id: "9393939",
      descricao: "iaundia ndviau vianvdiandv iuan vian divua nd",
      valor: {
        original: 300.78,
        BRL: 499.4728,
      },
      data: new Date("2023-12-01T18:26:37.731Z"),
      hora: new Date("2023-12-01T18:30:37.731Z"),
      categoria: {
        label: "Saúde",
        key: "saude",
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
    {
      id: "77777ajdf",
      descricao: "iaundia ndviau vianvdiandv iuan vian divua nd",
      valor: {
        original: 300.78,
        BRL: 499.4728,
      },
      data: new Date("2023-12-01T18:26:37.731Z"),
      hora: new Date("2023-12-01T18:30:37.731Z"),
      categoria: {
        label: "Saúde",
        key: "saude",
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
console.log(transacoes)
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
        {!isAuth ? (
          <>
            <stackNavigator.Screen name="TransacaoList">
              {(props) => (
                <TransacaoListScreen
                  transacoes={transacoes}
                  onRemove={handleRemove}
                  {...props}
                />
              )}
            </stackNavigator.Screen>
            <stackNavigator.Screen name="TransacaoForm">
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
          <stackNavigator.Screen name="Login" component={LoginScreen} />
        )}
      </stackNavigator.Navigator>
    </NavigationContainer>
  );
}
