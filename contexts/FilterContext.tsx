import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ReleaseDate = "All" | "Year" | "Month" | "Week" | "Day";

interface FilterContextType {
  loading: boolean;
  selectedPlatforms: number[];
  selectedReleaseDate: ReleaseDate;
  setSelectedPlatforms: React.Dispatch<React.SetStateAction<number[]>>;
  setSelectedReleaseDate: React.Dispatch<React.SetStateAction<ReleaseDate>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const FILTER_STORAGE_KEY = "filter_settings";

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);

  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([]);
  const [selectedReleaseDate, setSelectedReleaseDate] =
    useState<ReleaseDate>("Month");

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const storedFilters = await AsyncStorage.getItem(FILTER_STORAGE_KEY);

        if (storedFilters) {
          const { platforms, releaseDate } = JSON.parse(storedFilters);

          if (platforms) setSelectedPlatforms(platforms);
          if (releaseDate) setSelectedReleaseDate(releaseDate);
        }
      } catch (error) {
        console.error("Failed to load filters from storage", error);
      } finally {
        setLoading(false);
      }
    };

    loadFilters();
  }, []);

  useEffect(() => {
    const saveFilters = async () => {
      try {
        const filters = JSON.stringify({
          platforms: selectedPlatforms,
          releaseDate: selectedReleaseDate,
        });

        await AsyncStorage.setItem(FILTER_STORAGE_KEY, filters);
      } catch (error) {
        console.error("Failed to save filters to storage", error);
      }
    };

    saveFilters();
  }, [selectedPlatforms, selectedReleaseDate]);

  return (
    <FilterContext.Provider
      value={{
        loading,
        selectedPlatforms,
        selectedReleaseDate,
        setSelectedPlatforms,
        setSelectedReleaseDate,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }

  return context;
};
