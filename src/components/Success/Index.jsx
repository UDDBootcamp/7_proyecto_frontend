import { useEffect } from "react";
import UserContext from "../../contexts/User/UserContext";


const SuccessPage = () => {
  const { clearCart } = UserContext();

  useEffect(() => {
    clearCart(); // Vacía el carrito al cargar la página
  }, []);

  return (
    <>
      <div className="container-fluid py-5 text-center">
        <div className="container">
          <h1>Pago Exitoso</h1>
          <p className="py-5">Su pago fue procesado correctamente.</p>
        </div>
      </div>
      <aside className="wallpaper wallpaper_1"></aside>
    </>
  );
};

export default SuccessPage;
