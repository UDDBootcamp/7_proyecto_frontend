import { useReducer } from "react";
import userReducer from "./UserReducer";
import UserContext from "./UserContext";
import axiosClient from "../../config/axios";

const userState = (props) => {
  const initialState = {
    currentUser: {
      username: "",
      email: "",
      contry: "",
      address: "",
      zipcode: 0,
    },
    cart: [],
    authState: false,
    sessionURL: null,
    globalLoading: false,
  };
  const [globalState, dispatch] = useReducer(userReducer, initialState);

  const registerUser = async (form) => {
    try {
      const response = await axiosClient.post("/users/register", form);

      dispatch({ type: "REGISTER_USER", payload: response.data });
      return true;
    } catch (error) {
      return false;
    }
  };

  const loginUser = async (form) => {
    try {
      const response = await axiosClient.post("/users/login", form, {
        withCredentials: true,
      });
      console.log(response);
      dispatch({ type: "LOGIN_EXITOSO" });
      return;
    } catch (error) {
      return error.response.data.message;
    }
  };

  const verifytoken = async () => {
    try {
      const response = await axiosClient.get("/users/verifytoken", {
        withCredentials: true,
      });
      const userData = response.data.user;
      dispatch({ type: "GET_USER_DATA", payload: userData });
      return true;
    } catch (error) {
      console.log("Error al verificar el token", error);
      return;
    }
  };

  const updateUser = async (form) => {
    await axiosClient.put(`/users/update/${form._id}`, form, {
      withCredentials: true,
    });
    dispatch({ type: "UPDATE_USER", payload: form });
  };

  const logoutUser = async (navigate) => {
    try {
      await axiosClient.post(
        "/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "LOGOUT_EXITOSO",
        payload: "Sesión cerrada correctamente",
      });
      navigate("iniciar-sesion");
    } catch (error) {
      console.log("Error al cerrar sesión", error);
      return;
    }
  };

  const editCart = async (data) => {
    try {
      const response = await axiosClient.put(
        "/carts/edit-cart",
        { products: data },
        { withCredentials: true }
      );

      await getCart();
      return response.data.message;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const getCart = async () => {
    try {
      const response = await axiosClient.get("/carts/get-cart", {
        withCredentials: true,
      });
      dispatch({
        type: "GET_CART",
        payload: response.data.cart.products,
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const getCheckoutSession = async () => {
    try {
      const response = await axiosClient.get("/carts/create-checkout-session", {
        withCredentials: true,
      });

      dispatch({
        type: "GET_CHECKOUT_SESSION",
        payload: response.data.session_url,
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const setLoading = (status) => {
    dispatch({
      type: "CHANGE_STATUS_LOADING",
      payload: status,
    });
  };

  return (
    <UserContext.Provider
      value={{
        currentUser: globalState.currentUser,
        cart: globalState.cart,
        authState: globalState.authState,
        globalLoading: globalState.globalLoading,
        sessionURL: globalState.sessionURL,
        registerUser,
        loginUser,
        verifytoken,
        updateUser,
        logoutUser,
        editCart,
        getCart,
        getCheckoutSession,
        setLoading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default userState;
