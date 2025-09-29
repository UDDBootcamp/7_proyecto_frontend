import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="/ver-personaje/:id" element={<CharacterDetail />} />
          <Route path="/buscar" element={<Search />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
