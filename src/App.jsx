import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home";
import PerfumesPage from "./pages/PerfumesPage";
import BuscaPage from "./pages/BuscaPage";
import RankingPage from "./pages/RankingPage";
import GuiaPage from "./pages/GuiaPage";
import SobrePage from "./pages/SobrePage";
import ContatoPage from "./pages/ContatoPage";
import TermosPage from "./pages/TermosPage";
import PrivacidadePage from "./pages/PrivacidadePage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/masculinos"
          element={<PerfumesPage genero="Masculinos" />}
        />
        <Route
          path="/femininos"
          element={<PerfumesPage genero="Femininos" />}
        />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/guia" element={<GuiaPage />} />
        <Route path="/busca" element={<BuscaPage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path="/termos" element={<TermosPage />} />
        <Route path="/privacidade" element={<PrivacidadePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
