import Icon from "@expo/vector-icons/FontAwesome6.js";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TransacaoFilters } from "../components/TransacaoFilters";
import { TransacaoItemList } from "../components/TransacaoItemList";
import { filterAndSortValues } from "../utils/filterAndSortValues";

export function TransacaoListScreen({ transacoes, navigation, onRemove }) {
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(null);

  const filteredTransacoes = filterAndSortValues(transacoes, { filter, sort });

  return (
    <View style={styles.container}>
      <TransacaoFilters
        filter={filter}
        onChangeFilter={setFilter}
        sort={sort}
        onChangeSort={setSort}
      />

      <View style={styles.listContainer}>
        {filteredTransacoes.length ? (
          <FlatList
            data={filteredTransacoes}
            renderItem={({ item }) => (
              <TransacaoItemList
                transacao={item}
                onEdit={(transacaoId) =>
                  navigation.navigate("TransacaoForm", {
                    transacao: transacaoId,
                  })
                }
                onRemove={onRemove}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text>
            {filter || sort
              ? "Nenhum resultado encontrado para a busca."
              : "Nenhuma transação cadastrada. Adicione uma transação."}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => navigation.navigate("TransacaoForm")}
      >
        <Icon name="plus" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  listContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    flex: 1,
  },
  fabButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});