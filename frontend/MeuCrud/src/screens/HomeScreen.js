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

  // ─── carregar participantes ────────────

  async function loadParticipants() {
    setLoading(true);
    setError(null);

    const { data, error } = await getParticipants();

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    setParticipants(data);
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadParticipants);
    return unsubscribe;
  }, [navigation]);

  // ─── filtro de pesquisa ────────────────

  const statusPriority = {
    "No paredão": 1,
    "Na casa": 2,
    "Eliminado(a)": 3,
  };

  const filtered = participants
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.state.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      // First, sort by status priority
      if (statusPriority[a.status] !== statusPriority[b.status]) {
        return statusPriority[a.status] - statusPriority[b.status];
      }
      // Second, sort alphabetically by name if status is the same
      return a.name.localeCompare(b.name);
    });

  // ─── contadores ───────────────────────

  const totalActive = participants.filter((p) => p.status === "Na casa").length;
  const totalParedao = participants.filter(
    (p) => p.status === "No paredão"
  ).length;
  const totalElim = participants.filter(
    (p) => p.status === "Eliminado(a)"
  ).length;

  // ─── estados de loading / erro ─────────

  if (loading) {
    return <LoadingState message="Carregando participantes..." />;
  }

  if (error) {
    return <EmptyState type="error" message={error} />;
  }

  // ─── render ───────────────────────────

  return (
    <View style={styles.screen}>
      {/* header */}
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

      {/* contadores */}
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

      {/* busca */}
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar por nome ou estado..."
      />

      {/* botão adicionar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddEdit")}
      >
        <Text style={styles.addButtonText}>+ Adicionar Participante</Text>
      </TouchableOpacity>

      {/* lista */}
      {filtered.length === 0 ? (
        <EmptyState
          type="empty"
          message={
            search.length > 0
              ? `Nenhum participante encontrado para "${search}"`
              : "Nenhum participante cadastrado ainda."
          }
        />
      ) : (
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
