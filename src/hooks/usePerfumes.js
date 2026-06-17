// hooks/usePerfumes.js

import { useState, useEffect, useMemo } from "react";
import { fetchAllPerfumes, toCardFormat } from "../services/sheets";

export function usePerfumes() {
  const [masculinos, setMasculinos] = useState([]);
  const [femininos, setFemininos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllPerfumes()
      .then(({ masculinos, femininos }) => {
        setMasculinos(masculinos.map(toCardFormat));
        setFemininos(femininos.map(toCardFormat));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { masculinos, femininos, loading, error };
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
        result = result.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.brand.toLowerCase().includes(search.toLowerCase()),
        );
      }

      // limita a quantidade se definido (ex: 6 na home)
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
