import { useCallback, useEffect, useState } from "react";
import { useFilter } from "@/contexts/FilterContext";
import getToken from "@/lib/getToken";

export default function useFetchGames() {
  const [error, setError] = useState<string | null>(null);
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { selectedPlatforms } = useFilter();

  const fetchGames = useCallback(async () => {
    try {
      setLoading(true);

      const accessToken = await getToken();

      const currentDate = new Date();
      const lastMonthDate = new Date();
      lastMonthDate.setMonth(currentDate.getMonth() - 1);

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
          where first_release_date >= ${Math.floor(
            lastMonthDate.getTime() / 1000
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
  }, [selectedPlatforms]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return { error, fetchGames, games, loading };
}
