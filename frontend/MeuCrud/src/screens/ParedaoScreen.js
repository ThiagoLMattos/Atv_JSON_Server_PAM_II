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

  // Fetch participants currently in Paredao
  async function loadParedao() {
    setLoading(true);
    setError(null);

    const { data, error } = await getParedao();

    // Error Handling
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    setParticipants(data);
    setLoading(false);
  }

  // Reloads data when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadParedao);
    return unsubscribe;
  }, [navigation]);

  // Calculate total votes across all participants
  const totalVotes = participants.reduce((sum, p) => sum + (p.votes ?? 0), 0);

  // Sorts list to show most voted first
  const sortedParticipants = [...participants].sort((a, b) => {
    return (b.votes ?? 0) - (a.votes ?? 0);
  });

  // Loading state handler
  if (loading) {
    return <LoadingState message="Carregando o paredão..." />;
  }

  // Error state handler
  if (error) {
    return <EmptyState type="error" message={error} />;
  }

  return (
    <View style={styles.screen}>
      {/* Header section */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.title}>Paredão</Text>
          <Text style={styles.subtitle}>
            {participants.length} no paredão · {totalVotes} votos
          </Text>
        </View>
      </View>

      {/* Conditional banner for active Paredao */}
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

      {/* List or empty fallback */}
      {participants.length === 0 ? (
        <EmptyState type="emptyParedao" /> // Paredao empty state
      ) : (
        <FlatList
          data={sortedParticipants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardParedao
              item={item}
              refresh={loadParedao}
              totalVotes={totalVotes}
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
