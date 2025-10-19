import { useContext, useEffect } from "react";
import ComicContext from "../../../contexts/Comic/ComicContext";
import { Link } from "react-router-dom";

const ComicList = () => {
  const cxt = useContext(ComicContext);
  const { comics, getComics } = cxt;

  useEffect(() => {
    getComics();
  }, []);

  return (
    <>
      <div className="container list">
        <div className="row py-5">
          {comics.length === 0 ? (
            <p className="badge p-2 bg-secondary">No hay cómics disponibles.</p>
          ) : (
            comics.map((comic) => (
              <div className="col-lg-4 col-md-6 col-12 p-3" key={comic._id}>
                <div className="card">
                  <div className="img">
                    {comic.isnew && <div className="bookmark">NUEVO</div>}

                    <Link to={`/comic/${comic._id}`} state={{ comic }}>
                      <img
                        src={comic.img}
                        className="card-img"
                        alt={comic.name}
                      />
                    </Link>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{comic.name}</h5>
                    <p className="card-price">
                      $ {comic.price.toLocaleString("es-CL")}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to={`/comic/${comic._id}`} state={{ comic }}>
                        <div className="btn btn-secondary">Ver</div>
                      </Link>
                      <div
                        className={` ${
                          comic.qty === 0 ? "text-secondary" : "text-secondary"
                        }`}
                      >
                        {comic.qty === 0 ? "Agotado" : `Stock: ${comic.qty}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <aside className="wallpaper wallpaper_1"></aside>
    </>
  );
};

export default ComicList;
