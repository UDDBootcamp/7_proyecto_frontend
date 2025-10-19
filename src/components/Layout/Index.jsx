import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container-fluid p-0">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
