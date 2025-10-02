import { useReducer } from "react";
import ComicContext from "./ComicContext";
import ComicReducer from "./ComicReducer";
import axiosClient from "../../config/axios";

const ComicState = (props) => {
  const initialState = {
    comics: [],
  };

  // useReducer es similar a useState, pero es más adecuado para estados complejos
  // y permite manejar múltiples sub-valores en un solo estado.
  const [globalState, dispatch] = useReducer(ComicReducer, initialState);

  const getComics = async () => {
    try {
      const response = await axiosClient.get("/product/readall");
      console.log(response.data);
      dispatch({
        type: "OBTENER_COMICS",
        payload: response.data.comics,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // provee a los componentes hijos (comics: initialState.comics)
  return (
    <ComicContext.Provider value={{ comics: globalState.comics, getComics }}>
      {props.children}
    </ComicContext.Provider>
  );
};

export default ComicState;
