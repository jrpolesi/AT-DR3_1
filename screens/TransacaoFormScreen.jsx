import { useMemo } from "react";
import { Text, View } from "react-native";
import { TransacaoForm } from "../components/TransacaoForm";

export function TransacaoFormScreen({
  transacoes,
  navigation,
  onCreate,
  onUpdate,
  route,
}) {
  const transacaoId = route.params?.transacao;

  const transacao = useMemo(() => {
    return transacoes.find((item) => item.id === transacaoId || null);
  }, [transacaoId, transacoes]);

  function handleSubmit(value) {
    const normalizedValue = {
      descricao: value.description,
      valor: value.value,
      data: value.date,
      hora: value.hour,
      categoria: value.category,
      tipo: value.type,
      moeda: value.currency,
    };

    if (transacao) {
      onUpdate(normalizedValue);
    } else {
      onCreate(normalizedValue);
    }

    navigation.navigate("TransacaoList");
  }

  return (
    <View>
      <Text>TransacaoFormScreen</Text>

      <TransacaoForm
        defaultValue={
          transacao && {
            description: transacao.descricao,
            value: transacao.valor,
            date: transacao.data,
            hour: transacao.hora,
            category: transacao.categoria,
            type: transacao.tipo,
            currency: transacao.moeda,
          }
        }
        onSubmit={handleSubmit}
      />
    </View>
  );
}
