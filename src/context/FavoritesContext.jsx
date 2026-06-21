import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const STORAGE_KEY = "dupescent_favoritos";

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const isFavorite = useCallback(
    (item) =>
      favorites.some((f) => f.brand === item.brand && f.name === item.name),
    [favorites],
  );

  const toggleFavorite = useCallback((item) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.brand === item.brand && f.name === item.name,
      );
      if (exists) {
        return prev.filter(
          (f) => !(f.brand === item.brand && f.name === item.name),
        );
      }
      return [
        ...prev,
        {
          brand: item.brand,
          name: item.name,
          score: item.score,
          dupe: item.dupe,
          notes: item.notes,
          tags: item.tags,
        },
      ];
    });
  }, []);

  const clearFavorites = useCallback(() => setFavorites([]), []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites deve ser usado dentro de FavoritesProvider");
  return ctx;
}
