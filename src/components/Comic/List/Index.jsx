import { useContext, useEffect } from "react";
import ComicContext from "../../../contexts/Comic/ComicContext";

const ComicList = () => {
  const cxt = useContext(ComicContext);
  const { comics, getComics } = cxt;

  useEffect(() => {
    getComics();
  }, []);

  return (
    <div>
      {comics.length === 0 ? (
        <p>No hay cómics disponibles.</p>
      ) : (
        comics.map((comic) => (
          <div key={comic._id}>
            <h1>{comic.name}</h1>
          </div>
        ))
      )}
    </div>
  );
};

export default ComicList;
