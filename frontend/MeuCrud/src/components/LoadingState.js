import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

import styles from "../styles/LoadingState.styles";
import { COLORS } from "../styles/globalStyles";

/*
 * LoadingState
 * Exibe um indicador de carregamento centralizado
 * Requisito Sênior — indicador de loading enquanto a API é chamada
 * Props:
 *   message: string (opcional)
 */
export default function LoadingState({ message = "Carregando..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
