import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import styles from "../styles/ParedaoScreen.styles";

import CardParedao from "../components/CardParedao";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";

import { getParedao } from "../servers/participantsCrud";

export default function ParedaoScreen({ navigation }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ─── carregar paredão ──────────────────

  async function loadParedao() {
    setLoading(true);
    setError(null);

    const { data, error } = await getParedao();

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    setParticipants(data);
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadParedao);
    return unsubscribe;
  }, [navigation]);

  // ─── total de votos ────────────────────

  const totalVotes = participants.reduce((sum, p) => sum + (p.votes ?? 0), 0);

  // ─── ordenação por votos (Mais votos primeiro) ───

  const sortedParticipants = [...participants].sort((a, b) => {
    return (b.votes ?? 0) - (a.votes ?? 0);
  });

  // ─── estados de loading / erro ─────────

  if (loading) {
    return <LoadingState message="Carregando o paredão..." />;
  }

  if (error) {
    return <EmptyState type="error" message={error} />;
  }

  // ─── render ───────────────────────────

  return (
    <View style={styles.screen}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.title}>🔴 Paredão</Text>
          <Text style={styles.subtitle}>
            {participants.length} no paredão · {totalVotes} votos
          </Text>
        </View>
      </View>

      {/* banner — só aparece se houver alguém no paredão */}
      {participants.length > 0 && (
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Vote e elimine!</Text>
            <Text style={styles.bannerSubtitle}>
              O participante com mais votos será eliminado pelo Brasil.
            </Text>
          </View>
        </View>
      )}

      {/* lista */}
      {participants.length === 0 ? (
        <EmptyState type="emptyParedao" />
      ) : (
        <FlatList
          data={sortedParticipants} // <--- Use the sorted list here!
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardParedao item={item} refresh={loadParedao} />
          )}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
