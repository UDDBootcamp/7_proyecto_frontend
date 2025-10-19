import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <>
      <div className="container-fluid py-5 text-center">
        <div className="container">
          <h1>El Pago Fue cancelado</h1>
          <p className="py-5">Intente nuevamente.</p>

          <Link to="/carrito" className="btn btn-primary">
            Ir al carrito
          </Link>
        </div>
      </div>
      <aside className="wallpaper wallpaper_2"></aside>
    </>
  );
};

export default CancelPage;
