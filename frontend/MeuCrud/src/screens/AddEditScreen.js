import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import styles from "../styles/AddEditScreen.styles";
import ParticipantAvatar from "../components/ParticipantAvatar";
import {
  createParticipant,
  updateParticipant,
} from "../servers/participantsCrud";

// Text input field component
// Kept outside to prevent keyboard flickering on re-render (had problems with it)
function Field({
  label,
  field,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  focused,
  onFocus,
  onBlur,
  errors,
  maxLength,
}) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[
          styles.input,
          focused === field && styles.inputFocused, // Highlight focused field
          errors[field] && styles.inputError, // Highlight error state
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#555555"
        keyboardType={keyboardType}
        onFocus={() => onFocus(field)}
        onBlur={onBlur}
        autoCorrect={false}
        maxLength={maxLength}
      />

      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );
}

// Phone mask — (XX) XXXXX-XXXX
function applyPhoneMask(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 11)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;

  return value;
}

export default function AddEditScreen({ route, navigation }) {
  const participant = route.params?.participant;
  const isEditing = !!participant; // Boolean check for edit mode

  // Form states
  const [name, setName] = useState(participant?.name || "");
  const [state, setState] = useState(participant?.state || "");
  const [age, setAge] = useState(participant?.age?.toString() || "");
  const [occupation, setOccupation] = useState(participant?.occupation || "");
  const [phone, setPhone] = useState(participant?.phone || "");

  const [focused, setFocused] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Business rules for form validation
  function validate() {
    const newErrors = {};
    const phoneDigits = phone.replace(/\D/g, "");

    if (!name.trim()) newErrors.name = "Nome é obrigatório";
    if (name.trim().length < 2)
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";

    if (!state.trim()) newErrors.state = "Estado é obrigatório";

    const estadosBrasil = [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ];

    if (!estadosBrasil.includes(state.trim()))
      newErrors.state = "Use uma sigla válida de estado do Brasil (ex: SP)";

    if (!age.trim()) newErrors.age = "Idade é obrigatória";
    if (isNaN(Number(age)) || Number(age) <= 0)
      newErrors.age = "Idade deve ser um número válido";
    if (Number(age) < 16 || Number(age) > 100)
      newErrors.age = "Idade deve ser entre 16 e 100 anos";
    if (!/^\d+$/.test(age.trim()))
      newErrors.age = "Idade deve conter apenas números"; // There's already a only numbers keyboard but this is a good extra check

    if (!occupation.trim()) newErrors.occupation = "Ocupação é obrigatória";
    if (occupation.trim().length < 2)
      newErrors.occupation = "Ocupação deve ter pelo menos 2 caracteres";

    if (!phone.trim()) newErrors.phone = "Telefone é obrigatório";
    if (phoneDigits.length < 10 || phoneDigits.length > 11)
      newErrors.phone = "Telefone inválido — use (XX) XXXXX-XXXX";
    if (!/^\d+$/.test(phoneDigits))
      newErrors.phone = "Telefone deve conter apenas números"; // There's already a only numbers keyboard but this is a good extra check

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Valid if no error keys exist
  }

  // Handle save action (Create or Update)
  async function handleSave() {
    if (!validate()) return; // Stop if validation fails

    setSaving(true);

    const data = {
      name: name.trim(),
      state: state.trim().toUpperCase(),
      age: Number(age),
      occupation: occupation.trim(),
      phone: phone.trim(),
    };

    const { error } = isEditing
      ? await updateParticipant(participant.id, data)
      : await createParticipant(data);

    setSaving(false);

    // Error Handling
    if (error) {
      Alert.alert("Ops!", error);
      return;
    }

    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header section */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {isEditing ? "✏️ Editar" : "➕ Adicionar"}
        </Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          {/* Avatar preview */}
          <View style={styles.avatarPreview}>
            <ParticipantAvatar
              photo={participant?.photo} // Participants does not have a photo field attribute, but if they had it would show the preview here
              name={name || "?"} // Placeholder for name preview
              status={participant?.status || "Na casa"}
            />
          </View>

          {/* Form fields */}
          <Field
            label="Nome completo"
            field="name"
            value={name}
            onChangeText={setName}
            placeholder="Ex: Ana Clara"
            focused={focused}
            onFocus={setFocused}
            onBlur={() => setFocused(null)}
            errors={errors}
            maxLength={50}
          />

          <Field
            label="Estado (sigla)"
            field="state"
            value={state}
            onChangeText={(t) => setState(t.toUpperCase())}
            placeholder="Ex: SP"
            focused={focused}
            onFocus={setFocused}
            onBlur={() => setFocused(null)}
            errors={errors}
            maxLength={2}
          />

          <Field
            label="Idade"
            field="age"
            value={age}
            onChangeText={setAge}
            placeholder="Ex: 24"
            keyboardType="numeric"
            focused={focused}
            onFocus={setFocused}
            onBlur={() => setFocused(null)}
            errors={errors}
            maxLength={3}
          />

          <Field
            label="Ocupação"
            field="occupation"
            value={occupation}
            onChangeText={setOccupation}
            placeholder="Ex: Estudante"
            focused={focused}
            onFocus={setFocused}
            onBlur={() => setFocused(null)}
            errors={errors}
            maxLength={50}
          />

          <Field
            label="Telefone"
            field="phone"
            value={phone}
            onChangeText={(t) => setPhone(applyPhoneMask(t))}
            placeholder="(XX) XXXXX-XXXX"
            keyboardType="phone-pad"
            focused={focused}
            onFocus={setFocused}
            onBlur={() => setFocused(null)}
            errors={errors}
            maxLength={16}
          />
        </View>
      </ScrollView>

      {/* Save button logic */}
      <TouchableOpacity
        style={[styles.saveButton, saving && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving
            ? "Salvando..."
            : isEditing
              ? "Salvar alterações"
              : "Adicionar participante"}{" "}
          {/* Responsive Text for whats happening */}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
