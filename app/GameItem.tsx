import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function GameItem({ game }: Readonly<{ game: any }>) {
  return (
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
          <ThemedText>
            {game.aggregated_rating ? Math.round(game.aggregated_rating) : "--"}
          </ThemedText>
        </View>
        <ThemedText style={styles.platforms}>
          {game.platforms?.map((platform: any) => platform.name).join(", ")}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  thumbnail: {
    height: 50,
    width: 50,
  },
  title: {
    flex: 1,
  },
});
