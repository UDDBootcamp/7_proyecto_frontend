import { useState, useContext, useEffect } from "react";

import UserContext from "../../contexts/User/UserContext";

export default function Profile() {
  const userCtx = useContext(UserContext);

  const { updateUser } = userCtx;

  const { email } = userCtx.currentUser || {};

  const [userForm, setUserForm] = useState({
    _id: "",
    username: "",
    email: "",
    country: "",
    address: "",
    zipcode: "",
  });

  useEffect(() => {
    if (!userCtx.currentUser) return;

    const {
      _id = "",
      username = "",
      email = "",
      country = "",
      address = "",
      zipcode = "",
    } = userCtx.currentUser;

    setUserForm({
      _id,
      username,
      email,
      country,
      address,
      zipcode: zipcode?.toString() || "",
    });
  }, [userCtx.currentUser]);

  const handleChange = async (event) => {
    setUserForm({
      ...userForm,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = async (event) => {
    event.preventDefault();

    await updateUser(userForm);
  };

  return (
    <>
      <div className="d-flex justify-content-center wallpaper_3">
        <div className="card card-profile">
          <section className="container pt-5 text-center">
            <h2 className="text-secondary">TU PERFIL</h2>
          </section>
          <section className="container py-5">
            <form
              onSubmit={(e) => {
                sendData(e);
              }}
            >
              <div className="col-12 pb-4 px-5">
                <label htmlFor="username" className="col-12 col-form-label">
                  Nombre de usuario
                </label>
                <div className="col-12">
                  <input
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    value={userForm.username}
                    name="username"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-12 pb-4 px-5">
                <label htmlFor="email" className="col-12 col-form-label">
                  Correo electrónico
                </label>
                <div className="col-12">
                  <input
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    value={email}
                    name="email"
                    type="email"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-12 pb-4 px-5">
                <label htmlFor="country" className="col-12 col-form-label">
                  País
                </label>
                <div className="col-12">
                  <input
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    value={userForm.country}
                    name="country"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-12 pb-4 px-5">
                <label htmlFor="address" className="col-12 col-form-label">
                  Dirección
                </label>
                <div className="col-12">
                  <input
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    value={userForm.address}
                    name="address"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-12 pb-4 px-5">
                <label htmlFor="zipcode" className="col-12 col-form-label">
                  Código postal
                </label>
                <div className="col-12">
                  <input
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    value={userForm.zipcode}
                    name="zipcode"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="text-center pt-5">
                <button type="submit" className="btn btn-primary">
                  Guardar cambios
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
