const userReducer = (globalState, action) => {
  switch (action.type) {
    case "REGISTRO_EXITOSO":
      return {
        ...globalState,
        message: "Usuario creado exitosamente",
      };
    case "LOGIN_EXITOSO":
      return {
        ...globalState,
        authState: true,
      };
    case "GET_USER_DATA":
      return {
        ...globalState,
        authState: true,
        currentUser: action.payload,
      };
    case "LOGOUT_EXITOSO":
      return {
        ...globalState,
        currentUser: null,
        authState: false,
        msg: action.payload,
      };
    case "GET_CART":
      return {
        ...globalState,
        cart: action.payload,
      };
    case "GET_CHECKOUT_SESSION":
      return {
        ...globalState,
        sessionURL: action.payload,
      };
    case "CHANGE_STATUS_LOADING":
      return {
        ...globalState,
        globalLoading: action.payload,
      };
    default:
      return globalState;
  }
};

export default userReducer;
