import { useContext, useState } from "react";
import UserContext from "../../contexts/User/UserContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const ctx = useContext(UserContext);
  const { loginUser } = ctx;
  const navigate = useNavigate();
  const [logUser, setLogUser] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setLogUser({
      ...logUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(logUser);
    if (response) setErrorMessage(response);
    return;
  };

  return (
    <>
      <div className="d-flex justify-content-center wallpaper_3">
        <div className="card card-profile">
          <section className="container pt-5 text-center">
            <h2 className="text-secondary">INICIAR SESIÓN</h2>
            <p className="text-secondary">
              ¿Aún sin cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          </section>
          <section className="container py-5">
            {errorMessage && (
              <div
                className="alert alert-danger col-12 col-md-6 offset-md-3"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="col-12 pb-4 px-5">
                <label htmlFor="email" className="col-12 col-form-label">
                  Nombre de usuario
                </label>
                <div className="col-12">
                  <input
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    name="email"
                    type="email"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-12 pb-4 px-5">
                <label htmlFor="password" className="col-12 col-form-label">
                  Contraseña
                </label>
                <div className="col-12">
                  <input
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    name="password"
                    type="password"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="text-center pt-5">
                <button type="submit" className="btn btn-primary">
                  Iniciar sesión
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default Login;
