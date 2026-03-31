import React from "react";
import { View, Text } from "react-native";

import styles from "../styles/EmptyState.styles";

/*
 * EmptyState
 * Exibe uma mensagem quando a lista está vazia ou quando há erro
 * Requisito Sênior — mensagem de erro caso a API esteja indisponível
 * Props:
 *   type:    "empty" | "error"
 *   message: string (opcional)
 */
export default function EmptyState({ type = "empty", message }) {
  const content = {
    empty: {
      emoji: "🏠",
      title: "Nenhum participante",
      message: message || "A casa está vazia por enquanto.",
    },
    error: {
      emoji: "😔",
      title: "Não foi possível conectar à casa",
      message: message || "Verifique sua conexão e tente novamente.",
    },
    emptyParedao: {
      emoji: "🎉",
      title: "Sem paredão",
      message: message || "Nenhum participante está no paredão agora.",
    },
  };

  const current = content[type] || content.empty;

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{current.emoji}</Text>
      <Text style={[styles.title, type === "error" && styles.errorTitle]}>
        {current.title}
      </Text>
      <Text style={styles.message}>{current.message}</Text>
    </View>
  );
}
