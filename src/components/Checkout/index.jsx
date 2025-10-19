import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/User/UserContext";
import { formatCLP } from "../../utils/formatCLP";

export default function index() {
  const userCtx = useContext(UserContext);

  const { cart, sessionURL, getCheckoutSession, editCart } = userCtx;

  const [total, setTotal] = useState(0);

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

    const updatedCart = cart.filter((elt) => {
      return elt.priceID !== currentPriceID;
    });

    editCart(updatedCart);
  };

  return (
    <>
      <div className="container p-5">
        <h1 className="mb-5">Carrito</h1>
        <form>
          <ul className="p-0">
            {cart.map((e) => {
              return (
                <li key={e._id} className="d-flex row">
                  <figure className="col-12 col-md">
                    <img
                      src={e.img}
                      alt={e.name}
                      className="img-fluid cart-img"
                    />
                  </figure>
                  <div className="col-12 col-md-10 ps-md-5">
                    <div className="flex justify-between sm:grid sm:grid-cols-2">
                      <div className="pr-6">
                        <h3 className="text-sm">{e.name}</h3>
                      </div>

                      <p className="text-end">
                        Cantidad: {e.quantity}{" "}
                        <span className="text-danger fs-5 fw-bold ps-5">
                          {formatCLP(e.price)}
                        </span>
                      </p>

                      <p className="text-danger fs-4 fw-bold text-end">
                        {formatCLP(e.price * e.quantity)}
                      </p>
                    </div>

                    <div className="d-flex justify-content-end align-items-center gap-3">
                      <div className="form-floating">
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
                          {Array(5)
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

                      <button
                        type="button"
                        onClick={(evt) => {
                          handleRemove(evt, e.priceID);
                        }}
                        className="btn btn-primary"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="bg-gray-100 px-4 py-6 sm:p-6 lg:p-8">
            <div>
              <dl className="-my-4 text-sm ">
                <div className="py-4 flex items-center justify-between">
                  <dt className="font-bold">Total</dt>
                  <dd className="">{formatCLP(total)}</dd>
                </div>
              </dl>
            </div>
          </div>
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
        </form>
      </div>
    </>
  );
}
