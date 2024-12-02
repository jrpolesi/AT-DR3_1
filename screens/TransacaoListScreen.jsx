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

  const swipeableRefs = {};

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
                swipeableRefs={swipeableRefs}
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
          <Text style={styles.emptyText}>
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
        <Icon name="plus" size={24} color="#fff" />
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
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    fontSize: 16,
  },
  fabButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
