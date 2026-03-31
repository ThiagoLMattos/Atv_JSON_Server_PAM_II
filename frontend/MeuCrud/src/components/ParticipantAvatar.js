import React from "react";
import { Image } from "react-native";

import styles from "../styles/ParticipantAvatar.styles";

/*
 * ParticipantAvatar
 * Exibe a foto do participante
 * Se não houver foto, gera um avatar com as iniciais via UI Avatars
 * Props:
 *   photo:  string | null | undefined
 *   name:   string
 *   status: "Na casa" | "No paredão" | "Eliminado(a)"
 */
export default function ParticipantAvatar({ photo, name, status }) {
  // gera uma cor consistente baseada no nome
  // mesma pessoa → sempre a mesma cor, igual ao Google
  function getColorFromName(name) {
    const colors = [
      "E63946", // vermelho
      "FFD60A", // amarelo
      "2DC653", // verde
      "FF6B35", // laranja
      "FF9F1C", // âmbar
      "FFBF69", // pêssego
      "06D6A0", // verde água
      "118AB2", // azul
      "9B5DE5", // roxo
      "F15BB5", // rosa
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }

  const bg = getColorFromName(name);
  const fallbackUri = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=ffffff&size=128&bold=true`;

  const source = photo ? { uri: photo } : { uri: fallbackUri };

  function getAvatarStyle() {
    switch (status) {
      case "No paredão":
        return [styles.avatar, styles.avatarParedao];
      case "Eliminado(a)":
        return [styles.avatar, styles.avatarEliminated];
      default:
        return styles.avatar;
    }
  }

  return <Image source={source} style={getAvatarStyle()} />;
}
