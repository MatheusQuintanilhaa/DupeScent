import { useMemo } from "react";
import { getPreco } from "../components/PriceFilter";

export function useSorted(items, sortKey) {
  return useMemo(() => {
    const arr = [...items];
    switch (sortKey) {
      case "score":
        return arr.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
      case "score_asc":
        return arr.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
      case "preco_asc":
        return arr.sort((a, b) => {
          const brandA =
            a.allDupes?.[0]?.brand || a.dupe?.split(" — ")[1] || "";
          const brandB =
            b.allDupes?.[0]?.brand || b.dupe?.split(" — ")[1] || "";
          return getPreco(brandA) - getPreco(brandB);
        });
      case "preco_desc":
        return arr.sort((a, b) => {
          const brandA =
            a.allDupes?.[0]?.brand || a.dupe?.split(" — ")[1] || "";
          const brandB =
            b.allDupes?.[0]?.brand || b.dupe?.split(" — ")[1] || "";
          return getPreco(brandB) - getPreco(brandA);
        });
      case "nome":
        return arr.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
      case "marca":
        return arr.sort((a, b) => a.brand.localeCompare(b.brand, "pt-BR"));
      default:
        return arr;
    }
  }, [items, sortKey]);
}
