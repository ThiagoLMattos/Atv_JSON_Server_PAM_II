import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import styles from "../styles/HomeScreen.styles";
import { COLORS } from "../styles/globalStyles";

import CardParticipant from "../components/CardParticipant";
import SearchBar from "../components/SearchBar";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";

import { getParticipants } from "../servers/participantsCrud";

export default function HomeScreen({ navigation }) {
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all participants when the screen loads
  async function loadParticipants() {
    setLoading(true);
    setError(null);

    const { data, error } = await getParticipants();

    // Error Handling
    if (error) {
      setError(error);
      setLoading(false);
      return; // Stops function execution if there is an error
    }

    setParticipants(data);
    setLoading(false);
  }

  // Reloads the list whenever the screen gains focus
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadParticipants);
    return unsubscribe; // Cleans up listener on unmount
  }, [navigation]);

  // Priority table for status sorting
  const statusPriority = {
    "No paredão": 1,
    "Na casa": 2,
    "Eliminado(a)": 3,
  };

  // Filters and sorts the participants list based on search and status
  const filtered = participants
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.state.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (statusPriority[a.status] !== statusPriority[b.status]) {
        return statusPriority[a.status] - statusPriority[b.status]; // Sorts by status priority first
      }
      return a.name.localeCompare(b.name); // Sorts alphabetically by name if status is the same
    });

  // Calculate counter badges totals
  const totalActive = participants.filter((p) => p.status === "Na casa").length;
  const totalParedao = participants.filter(
    (p) => p.status === "No paredão",
  ).length;
  const totalElim = participants.filter(
    (p) => p.status === "Eliminado(a)",
  ).length;

  // Handles loading state
  if (loading) {
    return <LoadingState message="Carregando participantes..." />;
  }

  // Handles error state
  if (error) {
    return <EmptyState type="error" message={error} />;
  }

  // Renders main screen layout
  return (
    <View style={styles.screen}>
      {/* Header section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Big Bento Brasil</Text>
          <Text style={styles.subtitle}>Gerenciar participantes</Text>
        </View>

        <TouchableOpacity
          style={styles.paredaoButton}
          onPress={() => navigation.navigate("Paredao")}
        >
          <Text style={styles.paredaoButtonText}>🔴 Paredão</Text>
        </TouchableOpacity>
      </View>

      {/* Counter badges */}
      <View style={styles.counter}>
        <View style={styles.counterBadge}>
          <View
            style={[styles.counterDot, { backgroundColor: COLORS.inHouse }]}
          />
          <Text style={styles.counterText}>{totalActive} na casa</Text>
        </View>

        <View style={styles.counterBadge}>
          <View
            style={[styles.counterDot, { backgroundColor: COLORS.paredao }]}
          />
          <Text style={styles.counterText}>{totalParedao} no paredão</Text>
        </View>

        <View style={styles.counterBadge}>
          <View
            style={[styles.counterDot, { backgroundColor: COLORS.eliminated }]}
          />
          <Text style={styles.counterText}>{totalElim} eliminados</Text>
        </View>
      </View>

      {/* Search input bar */}
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar por nome ou estado..."
      />

      {/* Add participant button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddEdit")}
      >
        <Text style={styles.addButtonText}>+ Adicionar Participante</Text>
      </TouchableOpacity>

      {/* List or empty fallback state */}
      {filtered.length === 0 ? (
        <EmptyState
          type="empty"
          message={
            search.length > 0
              ? `Nenhum participante encontrado para "${search}"` // Message for searches
              : "Nenhum participante cadastrado ainda." // Empty state message
          }
        />
      ) : (
        // The list of participants, rendered with the CardParticipant component
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardParticipant
              item={item}
              navigation={navigation}
              refresh={loadParticipants}
            />
          )}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
