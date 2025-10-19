import { useContext, useState } from "react";
import UserContext from "../../contexts/User/UserContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const ctx = useContext(UserContext);
  const { registerUser } = ctx;
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      return setErrorMessage("Las contraseñas no coinciden");
    }

    const response = await registerUser(newUser);
    if (response === true) {
      navigate("/iniciar-sesion");
    } else {
      return setErrorMessage("Hubo un error al registrar el usuario");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center wallpaper_3">
        <div className="card card-profile">
          <section className="container pt-5 text-center">
            <h2 className="text-secondary">CREAR CUENTA</h2>
            <p className="text-secondary">
              ¿Ya tienes cuenta? <Link to="/iniciar-sesion">Inicia sesión</Link>
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
                <label htmlFor="username" className="col-12 col-form-label">
                  Nombre de usuario
                </label>
                <div className="col-12">
                  <input
                    onChange={(event) => {
                      handleChange(event);
                    }}
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
                    required
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-12 pb-4 px-5">
                <label
                  htmlFor="confirmPassword"
                  className="col-12 col-form-label"
                >
                  Confirmar Contraseña
                </label>
                <div className="col-12">
                  <input
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    name="confirmPassword"
                    type="password"
                    required
                    className="form-control"
                  />
                </div>
              </div>
              <div className="text-center pt-5">
                <button type="submit" className="btn btn-primary">
                  Registrarse
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default Register;
