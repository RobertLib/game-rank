import { useCallback, useEffect, useState } from "react";
import { useFilter } from "@/contexts/FilterContext";
import getToken from "@/lib/getToken";

export default function useFetchGames() {
  const [error, setError] = useState<string | null>(null);
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    loading: filterLoading,
    selectedPlatforms,
    selectedReleaseDate,
  } = useFilter();

  const fetchGames = useCallback(async () => {
    if (filterLoading) {
      return;
    }

    try {
      setLoading(true);

      const accessToken = await getToken();

      const currentDate = new Date();
      const startDate = new Date();

      switch (selectedReleaseDate) {
        case "All":
          startDate.setTime(0);
          break;
        case "Year":
          startDate.setFullYear(currentDate.getFullYear() - 1);
          break;
        case "Month":
          startDate.setMonth(currentDate.getMonth() - 1);
          break;
        case "Week":
          startDate.setDate(currentDate.getDate() - 7);
          break;
        case "Day":
          startDate.setDate(currentDate.getDate() - 1);
          break;
        default:
          startDate.setMonth(currentDate.getMonth() - 1);
          break;
      }

      let platformFilter = "";
      if (selectedPlatforms.length > 0) {
        platformFilter = ` & platforms = [${selectedPlatforms.join(",")}]`;
      }

      const response = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.EXPO_PUBLIC_CLIENT_ID ?? "",
          Authorization: `Bearer ${accessToken}`,
        },
        body: `
          fields name, first_release_date, aggregated_rating, platforms.name, cover.url;
          where first_release_date >= ${Math.floor(startDate.getTime() / 1000)}
          & first_release_date <= ${Math.floor(
            currentDate.getTime() / 1000
          )}${platformFilter};
          sort aggregated_rating desc;
          limit 100;
        `,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch games.");
      }

      const data = await response.json();

      setGames(data);
    } catch (error) {
      console.error(error);
      setError((error as Error).message || "Failed to fetch games.");
    } finally {
      setLoading(false);
    }
  }, [filterLoading, selectedPlatforms, selectedReleaseDate]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return { error, fetchGames, games, loading };
}
