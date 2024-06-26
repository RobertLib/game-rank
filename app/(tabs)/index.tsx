import {
  ActivityIndicator,
  ColorSchemeName,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useCallback, useEffect, useMemo } from "react";
import GameItem from "@/components/games/GameItem";
import useFetchGames from "@/hooks/useFetchGames";

export default function Index() {
  const navigation = useNavigation();

  const colorScheme = useColorScheme();
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Link asChild href="/game-filter">
          <TouchableOpacity>
            <Ionicons
              name="options"
              size={24}
              style={{ color: Colors.light.tint, marginRight: 10, padding: 5 }}
            />
          </TouchableOpacity>
        </Link>
      ),
    });
  }, [navigation]);

  const { error, fetchGames, games, loading } = useFetchGames();

  const handleRefresh = useCallback(() => {
    fetchGames();
  }, [fetchGames]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => <GameItem game={item} />,
    []
  );

  if (loading && games.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (games.length === 0) {
    return (
      <View style={styles.container}>
        <ThemedText type="subtitle">No games found</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <ThemedText type="subtitle">Something went wrong</ThemedText>
        <ThemedText type="subtitle">Please try again later</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={games}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl onRefresh={handleRefresh} refreshing={loading} />
        }
        renderItem={renderItem}
      />
    </View>
  );
}

const createStyles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      flex: 1,
      gap: 5,
      justifyContent: "center",
      padding: 15,
    },
    listContainer: {
      flex: 1,
    },
    separator: {
      backgroundColor: colorScheme === "light" ? "#dedede" : "#323232",
      height: 1,
    },
  });
