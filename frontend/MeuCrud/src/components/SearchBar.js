import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

import styles from "../styles/SearchBar.styles";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Buscar participante...",
}) {
  const [focused, setFocused] = useState(false);

  function handleClear() {
    onChangeText("");
  }

  return (
    <View style={[styles.container, focused && styles.containerFocused]}>
      <Text style={styles.icon}>🔍</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#555555"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoCorrect={false}
        autoCapitalize="none"
      />

      {value.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
