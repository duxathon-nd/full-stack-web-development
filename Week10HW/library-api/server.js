const express = require('express');
const app = express();
const port = 3000;

//parse the JSON request bodies 
app.use(express.json());
app.use(express.static('public'));

//in memory array for movies
let movies = [
    {id: 1, title: "The Hobbit", director: "Peter Jackson", year: 1937, 
    genre: "Fantasy", available: true},
    {id: 2, title: "The Godfather", director: "Francis Ford Coppola", year: 1972, 
    genre: "Crime", available: true},
    {id: 3, title: "The Godfather Part II", director: "Francis Ford Coppola", year: 1974, 
    genre: "Crime", available: true},
    {id: 4, title: "No Country for Old Men", director: "Joel Coen", year: 2007, 
    genre: "Crime", available: true},
    {id: 5, title: "Star Wars: Revenge of the Sith", director: "George Lucas", year: 2005, 
    genre: "Adventure", available: true},
    {id: 6, title: "Monty Python and the Holy Grail", director: "Terry Gilliam", year: 1975, 
    genre: "Comedy", available: true},
    {id: 7, title: "My Cousin Vinney", director: "Robert Benton", year: 1992, 
    genre: "Comedy", available: true},
    {id: 8, title: "Halo: Forward Unto Dawn", director: "J.J. Abrams", year: 2012, 
    genre: "Science Fiction", available: true},
    {id: 9, title: "Transformers: The Movie (1986)", director: "Homer Simpson", year: 1986, 
    genre: "Animation", available: true},
    {id: 10, title: "Toy Story", director: "John Lasseter", year: 1995, 
    genre: "Animation", available: true}
];

let nextId = 11;

//validate movie data
function validateMovie(body) {
    const { title, director, year, genre, available } = body;
    if (typeof title !== 'string' || !title.trim()) return "title is required";
    if (typeof director !== 'string' || !director.trim()) return "director is required";
    if (!Number.isInteger(year)) return "year must be a positive number";
    if (typeof genre !== 'string' || !genre.trim()) return "genre is required";
}

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head> 
                <title>Library API</title>
                <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
                <h1>Welcome to the Library API</h1>
                <p>Use the following endpoints to interact with the API:</p>
                <ul>
                    <li>GET /movies - Get all movies</li>
                    <li>GET /movies/:id - Get a movie by ID</li>
                    <li>POST /movies - Create a new movie</li>
                    <li>PUT /movies/:id - Update a movie by ID</li>
                    <li>DELETE /movies/:id - Delete a movie by ID</li>
                </ul>
            </body>
        </html>
    `);
});

//routes
//GET /movies - get all movies
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

//GET /movies/:id - get a movie by id
app.get('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const movie = movies.find((m) => m.id === id);
    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
});

//create a movie
//POST /movies - create a new movie
app.post('/movies', (req, res) => {
    const error = validateMovie(req.body);
    if (error) {
        return res.status(400).json({ error });
    }
    const {title, director, year, genre, available} = req.body;
    const newMovie = { id: nextId++, title, director, year, genre, available };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

//put
//PUT /movies/:id - update a movie by ID
app.put('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const movieIndex = movies.findIndex((m) => m.id === id);
    if (movieIndex === -1) {
        return res.status(404).json({ error: "Movie not found" });
    }
    const error = validateMovie(req.body);
    if (error) {
        return res.status(400).json({ error });
    }
    const {title, director, year, genre, available} = req.body;
    const updatedMovie = { id, title, director, year, genre, available };
    movies[movieIndex] = updatedMovie;
    res.status(200).json(updatedMovie);
});

//delete
//DELETE /movies/:id - delete a movie by ID
app.delete("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = movies.findIndex((m) => m.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Movie not found" });
    }
    const [removedMovie] = movies.splice(index, 1);
    res.status(200).json({message: "Movie deleted", movie: removedMovie});
});

//start our server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});