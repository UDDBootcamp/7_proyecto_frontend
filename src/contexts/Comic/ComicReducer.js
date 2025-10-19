const ComicReducer = (globalState, action) => {
  switch (action.type) {
    case "OBTENER_COMICS":
      return {
        ...globalState,
        comics: action.payload,
      };
    case "OBTENER_COMIC":
      return {
        ...globalState,
        currentComic: action.payload,
      };
    default:
      return globalState;
  }
};

export default ComicReducer;
