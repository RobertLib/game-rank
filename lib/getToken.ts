import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchToken = async () => {
  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.EXPO_PUBLIC_CLIENT_ID}&client_secret=${process.env.EXPO_PUBLIC_CLIENT_SECRET}&grant_type=client_credentials`,
    {
      method: "POST",
    }
  );

  return response.json();
};

export default async function getToken() {
  try {
    const storedAccessToken = await AsyncStorage.getItem("accessToken");
    const storedExpiresIn = await AsyncStorage.getItem("expiresIn");

    if (storedAccessToken && storedExpiresIn) {
      const expiryTime = parseInt(storedExpiresIn, 10);

      const fetchTimestamp = parseInt(
        (await AsyncStorage.getItem("fetchTimestamp")) ?? "0",
        10
      );

      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime < fetchTimestamp + expiryTime) {
        return storedAccessToken;
      }
    }

    const response = await fetchToken();

    await AsyncStorage.multiSet([
      ["accessToken", response.access_token],
      ["expiresIn", response.expires_in.toString()],
      ["fetchTimestamp", Math.floor(Date.now() / 1000).toString()],
    ]);

    return response.access_token;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch or update access token.");
  }
}
