import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSatate from "./contexts/User/UserState";
import ComicState from "./contexts/Comic/ComicState";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Layout from "./components/Layout/Index";
import Home from "./components/Home/Index";
import ComicSingle from "./components/Comic/Single/Index";
import Profile from "./components/Profile/Index";
import Checkout from "./components/Checkout/Index";
import SuccessPage from "./components/Success/index";
import CancelPage from "./components/Cancel/Index";
import AuthRoute from "./routes/Auth";
import PrivateRoute from "./routes/Private";

const Router = () => {
  return (
    <UserSatate>
      <ComicState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/registro" element={<Register />} />
              <Route
                path="/iniciar-sesion"
                element={<AuthRoute component={Login} />}
              />
              <Route
                path="/perfil"
                element={<PrivateRoute component={Profile} />}
              />
              <Route
                path="/carrito"
                element={<PrivateRoute component={Checkout} />}
              />
              <Route path="/comic/:id" element={<ComicSingle />} />
              <Route path="/pago-exitoso" element={<SuccessPage />} />
              <Route path="/pago-cancelado" element={<CancelPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ComicState>
    </UserSatate>
  );
};

export default Router;
