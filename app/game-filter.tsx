import {
  ColorSchemeName,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useMemo } from "react";
import { useFilter } from "@/contexts/FilterContext";
import { useNavigation } from "expo-router";
import Checkbox from "@/components/Checkbox";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

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

const RELEASE_DATES = ["All", "Year", "Month", "Week", "Day"];

export default function GameFilter() {
  const colorScheme = useColorScheme();
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);

  const {
    selectedPlatforms,
    selectedReleaseDate,
    setSelectedPlatforms,
    setSelectedReleaseDate,
  } = useFilter();

  const navigation = useNavigation();

  const isClearDisabled =
    selectedPlatforms.length === 0 && selectedReleaseDate === "Month";

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          disabled={isClearDisabled}
          onPress={() => {
            setSelectedPlatforms([]);
            setSelectedReleaseDate("Month");
            navigation.goBack();
          }}
        >
          <ThemedText
            style={[isClearDisabled && styles.clearDisabled]}
            type="link"
          >
            Clear
          </ThemedText>
        </TouchableOpacity>
      ),
    });
  }, [
    isClearDisabled,
    navigation,
    setSelectedPlatforms,
    setSelectedReleaseDate,
    styles,
  ]);

  const togglePlatform = (platformId: number) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ThemedText type="subtitle">Platforms</ThemedText>
        <View style={styles.platforms}>
          {PLATFORMS.map((platform) => (
            <Checkbox
              key={platform.id}
              label={platform.name}
              onValueChange={() => togglePlatform(platform.id)}
              value={selectedPlatforms.includes(platform.id)}
            />
          ))}
        </View>
        <ThemedText type="subtitle">Release date</ThemedText>
        <SegmentedControl
          onChange={(event) => {
            setSelectedReleaseDate(
              RELEASE_DATES[event.nativeEvent.selectedSegmentIndex] as any
            );
          }}
          selectedIndex={RELEASE_DATES.indexOf(selectedReleaseDate)}
          values={RELEASE_DATES}
        />
      </View>
    </ScrollView>
  );
}

const createStyles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    clearDisabled: {
      color: colorScheme === "light" ? "#999" : "#666",
    },
    container: {
      flex: 1,
      gap: 20,
      padding: 20,
    },
    platforms: {
      alignItems: "flex-start",
      gap: 10,
    },
  });
