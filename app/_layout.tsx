import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { FilterProvider } from "@/contexts/FilterContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import GameFilter from "./GameFilter";
import Modal from "@/components/Modal";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <FilterProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerRight: () => (
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Ionicons
                    name="options"
                    size={24}
                    style={{
                      color: colorScheme === "dark" ? "white" : "black",
                      padding: 5,
                    }}
                  />
                </TouchableOpacity>
              ),
              title: "GameRank",
            }}
          />
        </Stack>

        <Modal
          onClose={() => {
            setModalVisible(false);
          }}
          visible={modalVisible}
        >
          <GameFilter />
        </Modal>
      </FilterProvider>
    </ThemeProvider>
  );
}
