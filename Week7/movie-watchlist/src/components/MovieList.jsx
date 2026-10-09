import MovieCard from './MovieCard';

function MovieList() {
    const movies = [
        {
        title: "Inception",
        director: "Christopher Nolan",
        genre: "Science Fiction",
        releaseYear: 2010,
        rating: 8.8,
        runtime: 148,
        description: "A thief who enters dreams is given a difficult mission."   
    },
    {
        title: "The Matrix",
        director: "The Wachowskis",
        genre: "Action",
        releaseYear: 1999,
        rating: 8.7,
        runtime: 136,
        description: "Mr.Anderson, we've been expecting you."
    },
    {
        title: "The Godfather",
        director: "Francis Ford Coupula",
        genre: "Crime",
        releaseYear: 1970,
        rating: 9.9,
        runtime:154,
        description: "The greatest movie to ever insist upon itself."
    },
    {
        title: "Pulp Fiction",
        director: "Quinton Tarintino",
        genre: "Crime",
        releaseYear: 1999,
        rating: 9.9,
        runtime: 154,
        description: "A gangster, a hitman, and a boxer."
    }
    ];

    return (
        <section>
            <h2>Movies</h2>
            <div className="movie-list">
            {movies.map((movie, index) => (
                <MovieCard
                    key={index}
                    title={movie.title}
                    genre={movie.genre}
                    releaseYear={movie.releaseYear}
                />
            ))}
           </div>
        </section>
    );
}
export default MovieList;