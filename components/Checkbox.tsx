import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { useState } from "react";
import ExpoCheckbox, { CheckboxProps } from "expo-checkbox";

export default function Checkbox({
  label,
  onValueChange,
  value,
  ...rest
}: CheckboxProps & Readonly<{ label?: string }>) {
  const [checked, setChecked] = useState(value);

  const handlePress = () => {
    setChecked(!checked);

    if (onValueChange) {
      onValueChange(!checked);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <ExpoCheckbox onValueChange={handlePress} value={checked} {...rest} />
      <ThemedText>{label}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});
