import { Navigate, useLocation, Link } from "react-router-dom";
import { formatCLP } from "../../../utils/formatCLP";
import UserContext from "../../../contexts/User/UserContext";
import ComicContext from "../../../contexts/Comic/ComicContext";
import { useContext, useState, useEffect } from "react";

const ComicSingle = () => {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const { comic } = location?.state;
  const { authState, cart, editCart, getCart } = useContext(UserContext);
  const { setCurrentComic } = useContext(ComicContext);

  useEffect(() => {
    if (!comic) {
      return <Navigate to="/comic" />;
    }

    setCurrentComic(comic);
    getCart();
  }, []);
  console.log("🧩 Comic recibido:", comic);

  const handleChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quantity === 0) return;

    const item = {
      priceID: comic.priceID,
      name: comic.name,
      quantity,
      price: comic.price,
      img: comic.img,
    };

    const existingItemIndex = cart.findIndex(
      (el) => el.priceID === item.priceID
    );

    let updatedCart;
    if (existingItemIndex !== -1) {
      updatedCart = cart.map((el, i) =>
        i === existingItemIndex ? { ...el, quantity: item.quantity } : el
      );
    } else {
      updatedCart = [...cart, item];
    }

    await editCart(updatedCart);
    await getCart();
  };

  if (!comic) return null;

  const { name, description, img, price, qty, isnew } = comic;

  const quantityOptions = Array.from({ length: qty }, (_, i) => i + 1);

  return (
    <>
      <div className="container single py-5 px-0">
        <div className="row g-0">
          <figure className="col-md-4 m-0">
            <img className="img-fluid" src={img} alt={name} />
          </figure>
          <section className="d-flex flex-column text-secondary col-md-8 px-3 pt-3 pt-md-0 ps-md-5 pb-3">
            <h1 className="text-uppercase">{name}</h1>
            <p className="pt-3">{description}</p>
            <div className="mt-auto p-2 d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column">
                {isnew && <div className="bookmark">NUEVO</div>}
                <div className="text-danger fs-1 fw-bold">
                  {formatCLP(price)}
                </div>

                {qty > 0 ? (
                  <>
                    <div className="mb-4">Stock: {qty}</div>

                    {authState && (
                      <form
                        onSubmit={handleSubmit}
                        className="d-flex align-items-center gap-4"
                      >
                        <label>Cantidad</label>
                        <div className="form-floating">
                          <select
                            className="form-select py-0"
                            id="floatingSelect"
                            aria-label="Floating label select example"
                            value={quantity}
                            onChange={handleChange}
                          >
                            {quantityOptions.map((q) => (
                              <option key={q} value={q}>
                                {q}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-secondary"
                          disabled={quantity === 0}
                        >
                          {cart.length
                            ? "Modificar carrito"
                            : "Agregar al carrito"}
                        </button>
                      </form>
                    )}
                  </>
                ) : (
                  <h2 className="text-danger fw-bold">Agotado</h2>
                )}
                {!authState && (
                  <>
                    <p>Para comprar prímero debes estar registrado</p>
                    <Link to="/registro">
                      <button className="btn btn-secondary">Regístrate</button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
      <aside className="wallpaper wallpaper_2"></aside>
    </>
  );
};

export default ComicSingle;
