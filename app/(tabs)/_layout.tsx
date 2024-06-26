import { BlurView } from "expo-blur";
import { Colors } from "@/constants/Colors";
import { StyleSheet, useColorScheme } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            style={StyleSheet.absoluteFill}
            tint={colorScheme ?? "light"}
          />
        ),
        tabBarStyle: {
          backgroundColor:
            colorScheme === "light"
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(0, 0, 0, 0.3)",
          borderTopWidth: 0,
          elevation: 0,
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              color={color}
              name={focused ? "list" : "list-outline"}
            />
          ),
          title: "GameRank",
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              color={color}
              name={focused ? "star" : "star-outline"}
            />
          ),
          title: "Favorites",
        }}
      />
    </Tabs>
  );
}
