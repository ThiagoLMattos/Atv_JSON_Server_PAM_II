import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

import styles from "../styles/CardParticipant.styles";
import StatusBadge from "./StatusBadge";
import ParticipantAvatar from "./ParticipantAvatar";

import {
  toggleParedao,
  eliminateParticipant,
  deleteParticipant,
} from "../servers/participantsCrud";

export default function CardParticipant({ item, navigation, refresh }) {
  const isEliminated = item.status === "Eliminado(a)";
  const isInParedao = item.status === "No paredão";
  const isInHouse = item.status === "Na casa";

  // ─── handlers ─────────────────────────

  async function handleToggleParedao() {
    const { error } = await toggleParedao(item);
    if (error) {
      Alert.alert("Ops!", error);
      return;
    }
    refresh();
  }

  async function handleEliminate() {
    Alert.alert(
      "Eliminar participante",
      `Tem certeza que deseja eliminar ${item.name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const { error } = await eliminateParticipant(item);
            if (error) {
              Alert.alert("Ops!", error);
              return;
            }
            refresh();
          },
        },
      ],
    );
  }

  async function handleDelete() {
    Alert.alert(
      "Remover do sistema",
      `Isso irá remover ${item.name} permanentemente do sistema. Tem certeza?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            const { error } = await deleteParticipant(item);
            if (error) {
              Alert.alert("Ops!", error);
              return;
            }
            refresh();
          },
        },
      ],
    );
  }

  // ─── render ───────────────────────────

  return (
    <View
      style={[
        styles.card,
        isInParedao && styles.cardParedao,
        isEliminated && styles.cardEliminated,
        isInHouse && styles.cardInHouse,
      ]}
    >
      {/* info principal */}
      <View style={styles.content}>
        <ParticipantAvatar
          photo={item.photo}
          name={item.name}
          status={item.status}
        />

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>
            {item.occupation} · {item.state} · {item.age} anos
          </Text>
          <StatusBadge status={item.status} />
        </View>
      </View>

      {/* ações — só aparecem se não estiver eliminado */}
      {!isEliminated && (
        <View style={styles.actions}>
          {/* editar */}
          <TouchableOpacity
            style={[styles.actionButton, styles.btnEdit]}
            onPress={() =>
              navigation.navigate("AddEdit", { participant: item })
            }
          >
            <Text style={[styles.actionText, styles.btnEditText]}>
              ✏️ Editar
            </Text>
          </TouchableOpacity>

          {/* paredão toggle */}
          {isInParedao ? (
            <TouchableOpacity
              style={[styles.actionButton, styles.btnRemoveParedao]}
              onPress={handleToggleParedao}
            >
              <Text style={[styles.actionText, styles.btnRemoveParedaoText]}>
                🚪 Salvar
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.actionButton, styles.btnParedao]}
              onPress={handleToggleParedao}
            >
              <Text style={[styles.actionText, styles.btnParedaoText]}>
                🔴 Paredão
              </Text>
            </TouchableOpacity>
          )}

          {/* eliminar */}
          <TouchableOpacity
            style={[styles.actionButton, styles.btnEliminate]}
            onPress={handleEliminate}
          >
            <Text style={[styles.actionText, styles.btnEliminateText]}>
              Eliminar
            </Text>
          </TouchableOpacity>

          {/* deletar do sistema */}
          <TouchableOpacity
            style={[styles.actionButton, styles.btnDelete]}
            onPress={handleDelete}
          >
            <Text style={[styles.actionText, styles.btnDeleteText]}>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
