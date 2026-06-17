import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home";
import PerfumesPage from "./pages/PerfumesPage";
import BuscaPage from "./pages/BuscaPage";

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
        <Route path="/ranking" element={<div>Ranking — em breve</div>} />
        <Route path="/guia" element={<div>Guia — em breve</div>} />
        <Route path="/busca" element={<BuscaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
