import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { FilterProvider } from "@/contexts/FilterContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link, Stack } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <FilterProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="game-filter"
              options={{
                headerRight() {
                  return (
                    <Link href="../">
                      <ThemedText type="link">Close</ThemedText>
                    </Link>
                  );
                },
                presentation: "modal",
                title: "Filter",
              }}
            />
          </Stack>
        </FilterProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
