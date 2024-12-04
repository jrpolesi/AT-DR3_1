import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useLayoutOrientation } from "../hooks/useLayoutOrientation.jsx";
import { formatDate } from "../utils/formatDate.js";
import { formatTime } from "../utils/formatTime.js";
import { SideAction } from "./SideAction.jsx";

export function TransacaoItemList({
  transacao,
  onRemove,
  onEdit,
  swipeableRefs,
}) {
  const { isLandscape } = useLayoutOrientation();

  const ref = React.useRef(null);

  swipeableRefs[transacao.id] = ref;

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        ref={ref}
        containerStyle={styles.container}
        renderLeftActions={(_, drag) => (
          <SideAction
            onPress={() => {
              onEdit(transacao.id);
              ref.current.close();
            }}
            offsetX={-40}
            iconName="edit"
            drag={drag}
            style={styles.leftAction}
          />
        )}
        renderRightActions={(_, drag) => (
          <SideAction
            onPress={() => {
              delete swipeableRefs[transacao.id];
              onRemove(transacao.id);
            }}
            offsetX={+40}
            iconName="trash"
            drag={drag}
            color="#dc3545"
            style={styles.rightAction}
          />
        )}
        onSwipeableWillOpen={() => {
          for (const entry of Object.entries(swipeableRefs)) {
            const [id, ref] = entry;

            if (ref.current && id !== transacao.id) {
              ref.current.close();
            }
          }
        }}
      >
        <View style={styles.itemContainer}>
          {isLandscape && (
            <Text style={styles.moeda}>{transacao.moeda.key}</Text>
          )}

          <View style={styles.detailsContainer}>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={styles.descricao}
            >
              {transacao.descricao}
            </Text>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.data}>{formatDate(transacao.data)}</Text>
              {isLandscape && (
                <Text style={styles.hora}>{formatTime(transacao.hora)}</Text>
              )}
            </View>
          </View>

          <View style={styles.valueContainer}>
            <Text
              style={[
                styles.valor,
                transacao.tipo.key === "expense" && styles.valorDespesa,
              ]}
            >
              {transacao.valor.BRL.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>

            {isLandscape && (
              <View style={styles.typeCategoryContainer}>
                <Text style={styles.tipo}>{transacao.tipo.label}</Text>
                <Text style={styles.separator}>-</Text>
                <Text style={styles.categoria}>
                  {transacao.categoria.label}
                </Text>
              </View>
            )}
          </View>
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
  leftAction: {
    paddingRight: 20,
  },
  rightAction: {
    paddingLeft: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    gap: 8,
  },
  detailsContainer: {
    flex: 1,
    gap: 4,
  },
  dateTimeContainer: {
    flexDirection: "row",
  },
  descricao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  valor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28a745",
    textAlign: "right",
  },
  valorDespesa: {
    color: "#dc3545",
  },
  data: {
    fontSize: 14,
    color: "#666",
  },
  hora: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },
  categoria: {
    fontSize: 14,
    color: "#666",
  },
  tipo: {
    fontSize: 14,
    color: "#666",
  },
  moeda: {
    fontSize: 14,
    color: "#666",
  },
  valueContainer: {
    alignItems: "flex-end",
    flexShrink: 0,
  },
  typeCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  separator: {
    marginHorizontal: 5,
    color: "#666",
  },
});
