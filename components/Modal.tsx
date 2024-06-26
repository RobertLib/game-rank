import {
  Dimensions,
  Modal as ModalRN,
  ModalProps,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "./ThemedView";

const { height } = Dimensions.get("window");

export default function Modal({
  children,
  onClose,
  ...rest
}: ModalProps & Readonly<{ onClose?: () => void }>) {
  const colorScheme = useColorScheme();

  return (
    <ModalRN
      animationType="fade"
      onRequestClose={() => onClose?.()}
      transparent
      {...rest}
    >
      <View style={styles.backdrop}>
        <ThemedView style={styles.modal}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => onClose?.()}>
              <Ionicons
                color={colorScheme === "light" ? "#000" : "#fff"}
                name="close-circle-outline"
                size={28}
              />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            {children}
          </ScrollView>
        </ThemedView>
      </View>
    </ModalRN>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
  },
  content: {
    padding: 10,
  },
  header: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  modal: {
    borderRadius: 10,
    elevation: 5,
    maxHeight: height * 0.7,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "80%",
  },
});
