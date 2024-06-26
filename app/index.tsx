import {
  ColorSchemeName,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useMemo } from "react";
import GameItem from "./GameItem";
import useFetchGames from "@/hooks/useFetchGames";

export default function Index() {
  const { error, fetchGames, games, loading } = useFetchGames();

  const colorScheme = useColorScheme();
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);

  const handleRefresh = () => {
    fetchGames();
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText type="subtitle">Something went wrong.</ThemedText>
        <ThemedText type="subtitle">Please try again later.</ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={games}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={loading} />
      }
      renderItem={({ item }) => <GameItem game={item} />}
    />
  );
}

const createStyles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    errorContainer: {
      alignItems: "center",
      flex: 1,
      gap: 5,
      justifyContent: "center",
      padding: 15,
    },
    separator: {
      backgroundColor: colorScheme === "light" ? "#dedede" : "#323232",
      height: 1,
    },
  });
