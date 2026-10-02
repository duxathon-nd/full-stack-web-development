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

//class variables for the filter inputs
const searchInput = document.getElementById("search");
const genreFilter = document.getElementById("genre-filter");
const yearFilter = document.getElementById("year-filter");
const resetButton = document.getElementById("reset-button");
const movieCount = document.getElementById("movie-count");

function displayMovies(movieList){
    const movieContainer = document.getElementById("movie-container");
    movieContainer.innerHTML = "";

if(movieList.length === 0){
    movieContainer.innerHTML = "<p>No movies found. Try a different search.</p>";
    return;
}

    movieList.forEach(movie =>{
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <h2>${movie.title}</h2>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Genre:</strong>${movie.genre}</p>
            <p><strong>Release: Year:</strong>${movie.releaseYear}</p>
            <p><strong>Rating:</strong>${movie.rating}</p>
            <p><strong>Runtime:</strong>${movie.runtime}</p>
            <p><strong>Description:</strong>${movie.description}</p>
        `;
        movieContainer.appendChild(movieElement);
    });
}

displayMovies(movies);

function filterMovies() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;
    const selectedYear = yearFilter.value; 

    const filteredMovies = movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
        const matchesGenre = selectedGenre === "all" || movie.genre === selectedGenre;
        let matchesYear = true;

    if(selectedYear === "1990"){
        matchesYear = movie.releaseYear <2000;
    } else if (selectedYear === "2000"){
        matchesYear = movie.releaseYear >= 2000
    }

    return matchesSearch && matchesGenre &&matchesYear;
});

displayMovies(filteredMovies);
movieCount.textContent = `Showing: ${filteredMovies.length} movies`;
}

//event listeners for the filter inputs
searchInput.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);
yearFilter.addEventListener("change", filterMovies);
resetButton.addEventListener("click", () => {
    searchInput.value = "";
    genreFilter.value = "all";
    yearFilter.value = "all";
    filterMovies();
});
