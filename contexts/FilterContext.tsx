import { createContext, useContext, useState } from "react";

interface FilterContextType {
  selectedPlatforms: number[];
  setSelectedPlatforms: React.Dispatch<React.SetStateAction<number[]>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([]);

  return (
    <FilterContext.Provider value={{ selectedPlatforms, setSelectedPlatforms }}>
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
