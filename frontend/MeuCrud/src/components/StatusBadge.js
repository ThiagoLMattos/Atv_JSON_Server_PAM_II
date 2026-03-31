import React from "react";
import { View, Text } from "react-native";

import styles from "../styles/StatusBadge.styles";

export default function StatusBadge({ status }) {
  function getBadgeStyle() {
    switch (status) {
      case "Na casa":
        return styles.inHouse;
      case "No paredão":
        return styles.paredao;
      case "Eliminado(a)":
        return styles.eliminated;
      default:
        return styles.inHouse;
    }
  }

  function getTextStyle() {
    switch (status) {
      case "No paredão":
        return styles.textDark; // amarelo → texto escuro
      default:
        return styles.textLight; // verde/vermelho → texto claro
    }
  }

  function getLabel() {
    switch (status) {
      case "Na casa":
        return "Na casa";
      case "No paredão":
        return "No paredão";
      case "Eliminado(a)":
        return "Eliminado(a)";
      default:
        return status;
    }
  }

  return (
    <View style={[styles.badge, getBadgeStyle()]}>
      <Text style={[styles.text, getTextStyle()]}>{getLabel()}</Text>
    </View>
  );
}
