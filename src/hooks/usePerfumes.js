import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchAllPerfumes, toCardFormat } from "../services/sheets";

async function fetchPerfumes() {
  const { masculinos, femininos } = await fetchAllPerfumes();
  return {
    masculinos: masculinos.map(toCardFormat),
    femininos: femininos.map(toCardFormat),
  };
}

export function usePerfumes() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["perfumes"],
    queryFn: fetchPerfumes,
  });

  return {
    masculinos: data?.masculinos || [],
    femininos: data?.femininos || [],
    loading: isLoading,
    error: error?.message || null,
  };
}

export function useFilteredPerfumes(
  masculinos,
  femininos,
  { search, filter, limit = null },
) {
  return useMemo(() => {
    const applyFilters = (items) => {
      let result = items;

      if (!["Todos", "Masculinos", "Femininos"].includes(filter)) {
        result = result.filter((item) => item.tags.includes(filter));
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        result = result.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.brand.toLowerCase().includes(q) ||
            item.notes?.toLowerCase().includes(q),
        );
      }

      if (limit) result = result.slice(0, limit);

      return result;
    };

    const sections = [];

    if (filter !== "Femininos") {
      const items = applyFilters(masculinos);
      if (items.length > 0) sections.push({ label: "Masculinos", items });
    }

    if (filter !== "Masculinos") {
      const items = applyFilters(femininos);
      if (items.length > 0) sections.push({ label: "Femininos", items });
    }

    return sections;
  }, [masculinos, femininos, search, filter, limit]);
}
