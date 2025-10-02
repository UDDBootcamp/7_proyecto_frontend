import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import ComicState from "./contexts/Comic/ComicState";

const Router = () => {
  return (
    <ComicState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="/ver-personaje/:id" element={<CharacterDetail />} />
          <Route path="/buscar" element={<Search />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ComicState>
  );
};

export default Router;
