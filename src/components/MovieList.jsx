export default function MovieList(props) {
  return (
    <>
      {props.movies.map((movie) => {
        return (
          <div className="image-container d-flex m-3" key={movie.imdbID}>
            <img src={movie.Poster} alt="포스터" />
            <div
              onClick={() => props.addFavoriteMovie(movie)}
              className="overlay d-flex align-items-center justify-content-center"
            >
              <span className="me-2">
                {props.addMovie ? "선호작 추가" : "선호작 제거"}
              </span>
              <span>{props.addMovie ? "❤️" : "❌"}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}
