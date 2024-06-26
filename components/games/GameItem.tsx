import {
  Animated,
  ColorSchemeName,
  Image,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCallback, useMemo } from "react";

export default function GameItem({ game }: Readonly<{ game: any }>) {
  const colorScheme = useColorScheme();
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);

  const renderRightActions = useCallback(
    (
      progress: Animated.AnimatedInterpolation<string | number>,
      dragX: Animated.AnimatedInterpolation<string | number>
    ) => {
      const scale = dragX.interpolate({
        extrapolate: "clamp",
        inputRange: [-100, 0],
        outputRange: [1, 0],
      });

      return (
        <RectButton
          onPress={() => alert("Added to favorites")}
          style={styles.rightAction}
        >
          <Animated.Text
            style={[styles.actionText, { transform: [{ scale }] }]}
          >
            Add to Favorites
          </Animated.Text>
        </RectButton>
      );
    },
    [styles]
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <ThemedView style={styles.container}>
        <Image
          resizeMode="cover"
          source={{ uri: game.cover && `https:${game.cover.url}` }}
          style={styles.thumbnail}
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.title}>
              <ThemedText numberOfLines={1} type="defaultSemiBold">
                {game.name}
              </ThemedText>
            </View>
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>
                {game.aggregated_rating
                  ? Math.round(game.aggregated_rating)
                  : "--"}
              </ThemedText>
            </View>
          </View>
          <ThemedText style={styles.platforms}>
            {game.platforms?.map((platform: any) => platform.name).join(", ")}
          </ThemedText>
        </View>
      </ThemedView>
    </Swipeable>
  );
}

const createStyles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    actionText: {
      color: "#fff",
      fontSize: 16,
      padding: 20,
    },
    badge: {
      alignItems: "center",
      backgroundColor: colorScheme === "light" ? "#f5f5f5" : "#292929",
      borderRadius: 15,
      height: 30,
      justifyContent: "center",
      marginTop: -4,
      width: 30,
    },
    badgeText: {
      fontSize: 14,
    },
    container: {
      flex: 1,
      flexDirection: "row",
      gap: 10,
      padding: 15,
    },
    content: {
      flex: 1,
      gap: 2.5,
    },
    header: {
      flexDirection: "row",
      gap: 5,
      justifyContent: "space-between",
    },
    platforms: {
      fontSize: 14,
      lineHeight: 22,
      opacity: 0.7,
    },
    rightAction: {
      alignItems: "flex-end",
      backgroundColor: "#f79a0b",
      justifyContent: "center",
    },
    thumbnail: {
      height: 50,
      width: 50,
    },
    title: {
      flex: 1,
    },
  });
