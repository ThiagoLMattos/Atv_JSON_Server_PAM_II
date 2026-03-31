import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

import styles from "../styles/LoadingState.styles";
import { COLORS } from "../styles/globalStyles";

export default function LoadingState({ message = "Carregando..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
