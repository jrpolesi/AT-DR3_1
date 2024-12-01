import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useLayoutOrientation } from "../hooks/useLayoutOrientation.jsx";
import { formatDate } from "../utils/formatDate.js";
import { formatTime } from "../utils/formatTime.js";
import { SideAction } from "./SideAction.jsx";

export function TransacaoItemList({ transacao, onRemove, onEdit }) {
  const { isLandscape } = useLayoutOrientation();

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        containerStyle={styles.container}
        renderLeftActions={(_, drag) => (
          <SideAction
            onPress={() => onEdit(transacao.id)}
            offsetX={-40}
            iconName="edit"
            drag={drag}
          />
        )}
        renderRightActions={(_, drag) => (
          <SideAction
            onPress={() => onRemove(transacao.id)}
            offsetX={+40}
            iconName="trash"
            drag={drag}
          />
        )}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.descricao}>{transacao.descricao}</Text>
          <Text style={styles.valor}>{transacao.valor.BRL}</Text>
          <Text style={styles.data}>{formatDate(transacao.data)}</Text>
          {isLandscape && (
            <>
              <Text style={styles.hora}>{formatTime(transacao.hora)}</Text>
              <Text style={styles.categoria}>{transacao.categoria.label}</Text>
              <Text style={styles.tipo}>{transacao.tipo.label}</Text>
              <Text style={styles.moeda}>{transacao.moeda.label}</Text>
            </>
          )}
        </View>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  sideButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  descricao: {
    flex: 2,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  valor: {
    flex: 1,
    fontSize: 16,
    color: "#28a745",
    textAlign: "right",
  },
  data: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  hora: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  categoria: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  tipo: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  moeda: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
});
