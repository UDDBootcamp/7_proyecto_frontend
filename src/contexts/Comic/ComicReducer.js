const ComicReducer = (globalState, action) => {
  switch (action.type) {
    case "OBTENER_COMICS":
      return {
        ...globalState,
        comics: action.payload,
      };
    default:
      return globalState;
  }
};

export default ComicReducer;