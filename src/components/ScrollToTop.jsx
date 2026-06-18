import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // se a URL tem âncora (#piramide, #score etc), rola até o elemento
    if (hash) {
      const id = hash.replace("#", "");
      // espera o DOM da nova página renderizar antes de procurar o elemento
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      }, 0);
      return () => clearTimeout(timer);
    }

    // sem âncora: comportamento padrão, volta ao topo
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
