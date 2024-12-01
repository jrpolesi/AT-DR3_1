import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import Icon from "react-native-vector-icons/FontAwesome";
import { SORT_VALUES } from "../utils/filterAndSortValues.js";

export function TransacaoFilters({
  filter,
  onChangeFilter,
  sort,
  onChangeSort,
}) {
  const [filterValue, setFilterValue] = useState(filter);

  const selectedSort = SORT_VALUES.find(({ key }) => key === sort);

  return (
    <View style={styles.container}>
      <View style={styles.actionsContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={filterValue}
            onChangeText={(value) => setFilterValue(() => value.trimStart())}
            placeholder="Buscar..."
            style={styles.input}
          />

          <Icon.Button
            name="search"
            size={24}
            iconStyle={{
              marginRight: 4,
              marginHorizontal: 4,
            }}
            borderRadius={0}
            onPress={() => {
              onChangeFilter(filterValue);

              setFilterValue("");
            }}
          />
        </View>

        <ModalSelector
          data={SORT_VALUES}
          onChange={(opt) => onChangeSort(opt.key)}
          initValue={"Ordenar por..."}
          cancelText="Cancelar"
        />
      </View>
      <View style={styles.display}>
        {filter && (
          <Text style={styles.displayText}>Filtrado por: {filter}</Text>
        )}
        {sort && sort !== SORT_VALUES.none && (
          <Text style={styles.displayText}>
            Ordenado por: {selectedSort?.label}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    marginBottom: 0,
    gap: 10,
  },
  actionsContainer: {
    gap: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    padding: 8,
    backgroundColor: "#ebebeb",
    border: "none",
  },
  display: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  displayText: {
    color: "#888",
  },
});
