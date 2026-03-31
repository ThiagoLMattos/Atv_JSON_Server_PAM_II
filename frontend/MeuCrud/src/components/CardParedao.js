import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

import styles from "../styles/CardParedao.styles";
import ParticipantAvatar from "./ParticipantAvatar";

import {
  voteParticipant,
  eliminateParticipant,
  toggleParedao,
} from "../servers/participantsCrud";

export default function CardParedao({ item, refresh }) {
  // ─── handlers ─────────────────────────

  async function handleVote() {
    const { error } = await voteParticipant(item);
    if (error) {
      Alert.alert("Ops!", error);
      return;
    }
    refresh();
  }

  async function handleEliminate() {
    Alert.alert(
      "💀 Eliminar participante",
      `O Brasil decidiu! Tem certeza que deseja eliminar ${item.name} do BBB 26?`,
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

  async function handleSaveFromParedao() {
    Alert.alert(
      "🚪 Salvar do paredão",
      `Tem certeza que deseja salvar ${item.name} do paredão?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salvar",
          onPress: async () => {
            const { error } = await toggleParedao(item);
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
    <View style={styles.card}>
      {/* faixa superior */}
      <View style={styles.topStripe}>
        <Text style={styles.stripeText}>🔴 Paredão</Text>
        <Text style={styles.votesStripe}>
          {item.votes ?? 0} votos registrados
        </Text>
      </View>

      {/* conteúdo */}
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
        </View>

        {/* contador de votos */}
        <View style={styles.votesContainer}>
          <Text style={styles.votesNumber}>{item.votes ?? 0}</Text>
          <Text style={styles.votesLabel}>votos</Text>
        </View>
      </View>

      {/* ações */}
      <View style={styles.actions}>
        {/* votar */}
        <TouchableOpacity
          style={[styles.actionButton, styles.btnVote]}
          onPress={handleVote}
        >
          <Text style={[styles.actionText, styles.btnVoteText]}>🗳️ Votar</Text>
        </TouchableOpacity>

        {/* salvar da berlinda */}
        <TouchableOpacity
          style={[styles.actionButton, styles.btnSave]}
          onPress={handleSaveFromParedao}
        >
          <Text style={[styles.actionText, styles.btnSaveText]}>🚪 Salvar</Text>
        </TouchableOpacity>

        {/* eliminar */}
        <TouchableOpacity
          style={[styles.actionButton, styles.btnEliminate]}
          onPress={handleEliminate}
        >
          <Text style={[styles.actionText, styles.btnEliminateText]}>
            ❌ Eliminar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
