import { StyleSheet, View } from "react-native";
import { useFilter } from "@/contexts/FilterContext";
import Checkbox from "@/components/Checkbox";

const PLATFORMS = [
  { id: 167, name: "PlayStation 5" },
  { id: 48, name: "PlayStation 4" },
  { id: 390, name: "PlayStation VR2" },
  { id: 169, name: "Xbox Series X|S" },
  { id: 49, name: "Xbox One" },
  { id: 130, name: "Nintendo Switch" },
  { id: 6, name: "PC (Microsoft Windows)" },
  { id: 14, name: "Mac" },
  { id: 3, name: "Linux" },
  { id: 471, name: "Meta Quest 3" },
  { id: 386, name: "Meta Quest 2" },
  { id: 163, name: "SteamVR" },
];

export default function GameFilter() {
  const { selectedPlatforms, setSelectedPlatforms } = useFilter();

  const togglePlatform = (platformId: number) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <View style={styles.container}>
      {PLATFORMS.map((platform) => (
        <Checkbox
          key={platform.id}
          label={platform.name}
          onChange={() => togglePlatform(platform.id)}
          value={selectedPlatforms.includes(platform.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
