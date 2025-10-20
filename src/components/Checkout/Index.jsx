import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/User/UserContext";
import { formatCLP } from "../../utils/formatCLP";
import { Link } from "react-router-dom";

export default function Checkout() {
  const userCtx = useContext(UserContext);

  const { cart, sessionURL, getCheckoutSession, editCart } = userCtx;

  const [total, setTotal] = useState(0);
  const [savedMessage, setSavedMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    getCheckoutSession();
  };

  useEffect(() => {
    if (sessionURL) window.location.href = sessionURL;
  }, [sessionURL]);

  useEffect(() => {
    const reduceTotalFromOrder = () => {
      return cart.reduce((acc, cv) => {
        const updatedQuantity = cv.price * cv.quantity;

        return updatedQuantity + acc;
      }, 0);
    };

    const getOrderDetails = () => {
      const total = reduceTotalFromOrder();

      setTotal(total);
    };

    getOrderDetails();
  }, [cart]);

  const handleChange = (e) => {
    const updatedCart = cart.map((elt) => {
      return elt.priceID === e.target.name
        ? {
            ...elt,
            quantity: parseInt(e.target.value),
          }
        : elt;
    });

    editCart(updatedCart);
  };

  const handleRemove = (e, currentPriceID) => {
    e.preventDefault();

    try {
      setSavedMessage("Comic eliminado.");
      setTimeout(() => setSavedMessage(""), 3000);
    } catch (error) {
      setSavedMessage("Error al eliminar comic.");
      setTimeout(() => setSavedMessage(""), 3000);
    }

    const updatedCart = cart.filter((elt) => {
      return elt.priceID !== currentPriceID;
    });

    editCart(updatedCart);
  };

  return (
    <>
      <div className="container p-5">
        <h1 className="mb-5">Carrito</h1>
        {savedMessage && (
          <div className="alert alert-success text-center mx-5" role="alert">
            {savedMessage}
          </div>
        )}
        <form>
          <ul className="p-0">
            {cart.map((e) => {
              return (
                <li key={e._id} className="d-flex row py-3 border-bottom">
                  <figure className="col-12 col-md">
                    <img
                      src={e.img}
                      alt={e.name}
                      className="img-fluid cart-img"
                    />
                  </figure>
                  <div className="col-12 col-md-10 ps-md-5">
                    <div className="flex justify-between">
                      <div className="p-1">
                        <h3 className="text-sm">{e.name}</h3>
                      </div>

                      <div className="d-flex justify-content-end align-items-center">
                        <span>Cantidad: </span>
                        <div className="form-floating ps-3">
                          <select
                            className="form-select py-0"
                            id="floatingSelect"
                            aria-label="Floating label select example"
                            value={e.quantity}
                            name={e.priceID}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          >
                            {Array(e.qty)
                              .fill(null)
                              .map((_, i) => {
                                const initial = i + 1;

                                return initial === e.quantity ? (
                                  <option key={initial} value={initial}>
                                    {initial}
                                  </option>
                                ) : (
                                  <option key={initial} value={initial}>
                                    {initial}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <span className="fs-5 fw-bold ps-5">
                          {formatCLP(e.price)}
                        </span>
                      </div>

                      <p className="fs-4 fw-bold text-end">
                        {formatCLP(e.price * e.quantity)}
                      </p>
                    </div>

                    <div className="d-flex justify-content-end align-items-center gap-3">
                      <button
                        type="button"
                        onClick={(evt) => {
                          handleRemove(evt, e.priceID);
                        }}
                        className="btn btn-danger btn-close"
                      ></button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {total === 0 ? (
            <div className="text-center">
              <h2> No hay comics en el carrito</h2>

              <Link to="/" className="btn btn-primary my-5">
                Ir a comprar
              </Link>
            </div>
          ) : (
            <div className="text-end">
              <dl className="">
                <div className="py-4 flex items-center justify-between">
                  <dt className="font-bold fs-4 fw-bold">Total</dt>
                  <dd className="text-danger fs-4 fw-bold">
                    {formatCLP(total)}
                  </dd>
                </div>
              </dl>
              <div className="mt-10">
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  className="btn btn-primary"
                >
                  Procesar pago
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
