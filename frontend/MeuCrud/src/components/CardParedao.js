import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

import styles from "../styles/CardParedao.styles";
import ParticipantAvatar from "./ParticipantAvatar";

import {
  voteParticipant,
  eliminateParticipant,
  toggleParedao,
} from "../servers/participantsCrud";

export default function CardParedao({ item, refresh, totalVotes }) {
  // Math for the progress bar
  const votes = item.votes ?? 0;
  const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
  const displayPercent = percentage.toFixed(1) + "%";

  // Registers a new vote
  async function handleVote() {
    const { error } = await voteParticipant(item);

    // Error Handling
    if (error) {
      Alert.alert("Ops!", error);
      return;
    }
    refresh();
  }

  // Registers a new vote for the participant
  async function handleVote() {
    const { error } = await voteParticipant(item);

    // Error Handling
    if (error) {
      Alert.alert("🫠 Ops!", error);
      return;
    }
    refresh();
  }

  // Handles elimination from the reality show
  async function handleEliminate() {
    Alert.alert(
      "💀 Eliminar participante",
      `O Brasil decidiu!!! Tem certeza que deseja eliminar ${item.name} do BBB 26?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const { error } = await eliminateParticipant(item);

            // Error Handling
            if (error) {
              Alert.alert("🫠 Ops!", error);
              return;
            }
            refresh();
          },
        },
      ],
    );
  }

  // Removes participant from Paredao status
  async function handleSaveFromParedao() {
    Alert.alert(
      "🚪 Salvar do paredão",
      `😇 Tem certeza que deseja salvar ${item.name} do paredão?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salvar",
          onPress: async () => {
            const { error } = await toggleParedao(item);

            // Error Handling
            if (error) {
              Alert.alert("🫠 Ops!", error);
              return;
            }
            refresh();
          },
        },
      ],
    );
  }

  return (
    <View style={styles.card}>
      {/* Top info stripe */}
      <View style={styles.topStripe}>
        <Text style={styles.stripeText}>🔴 Paredão</Text>
        <Text style={styles.votesStripe}>
          {item.votes ?? 0} votos registrados
        </Text>
      </View>

      {/* Main card content */}
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

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Rejeição</Text>
              <Text style={styles.progressValue}>{displayPercent}</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[styles.progressBarFill, { width: displayPercent }]}
              />
            </View>
          </View>
        </View>

        {/* Individual vote counter */}
        <View style={styles.votesContainer}>
          <Text style={styles.votesNumber}>{item.votes ?? 0}</Text>
          <Text style={styles.votesLabel}>votos</Text>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.btnVote]}
          onPress={handleVote}
        >
          <Text style={[styles.actionText, styles.btnVoteText]}>🗳️ Votar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.btnSave]}
          onPress={handleSaveFromParedao}
        >
          <Text style={[styles.actionText, styles.btnSaveText]}>🚪 Salvar</Text>
        </TouchableOpacity>

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
