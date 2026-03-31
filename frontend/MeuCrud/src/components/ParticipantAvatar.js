import React from "react";
import { Image } from "react-native";

import styles from "../styles/ParticipantAvatar.styles";

export default function ParticipantAvatar({ photo, name, status }) {
  // Generates a bg color based on the participant's name for the avatar placeholder
  function getColorFromName(name) {
    const colors = [
      "E63946",
      "FFD60A",
      "2DC653",
      "FF6B35",
      "FF9F1C",
      "FFBF69",
      "06D6A0",
      "118AB2",
      "9B5DE5",
      "F15BB5",
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
