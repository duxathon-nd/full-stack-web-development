import { useState } from 'react';
import "./App.css";

const plants = [
     {
        name: "Edward Goucher",
        sunlight: "Full Sun",
        bloomseason: "Fall",
        plantheight: 3
    },
    {
        name: "Kaleidoscope",
        sunlight: "Partial Sun",
        bloomseason: "Spring",
        plantheight: 2
    },
    {
        name: "Mardi Gras",
        sunlight: "Full Sun",
        bloomseason: "Spring",
        plantheight: 3
    },     
    {
        name: "Radiance",
        sunlight: "Partial Sun",
        bloomseason: "Summer",
        plantheight: 2
    },    
    {
        name: "Glossy Abelia",
        sunlight: "Full Sun",
        bloomseason: "Summer",
        plantheight: 6
    },
    {
        name: "Hopleys",
        sunlight: "Partial Sun",
        bloomseason: "Fall",
        plantheight: 5
    }
];

function App() {
    //state information

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [favorites, setFavorites] = useState([]);

    //searching and filtering of Plants
    const filteredPlants = plants.filter((plant) => {
        const matchesSearch = plant.name
        .toLowerCase().includes(search.toLowerCase());

        const matchesCategory = selectedCategory === "All" ||
         plant.sunlight === selectedCategory;
        return matchesSearch && matchesCategory;
    }); 

    //add and remove favorites
    function toggleFavorite(id) {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter((plantID) => plantID !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    }

    return (
        <div className="App">
            <h1>Plant Finder</h1>
        <p>Search for a plant or filter by category</p>
        
        {/*User input and search*/}
        <input
        type="text"
        placeholder="Search for a plant..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        {/*Category filter*/}
        <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        >
            <option value="All">All</option>
            <option value="Full Sun">Full Sun</option>
            <option value="Partial Sun">Partial Sun</option>
        </select>

        <p>Plants: found {filteredPlants.length}</p>
        <p>Favorites: {favorites.length}</p>

        {/*Render on filters*/}
        {filteredPlants.length === 0 ? (
            <p>No plants found. Try another search!</p>
        ) : (
            <div className="plant-list">
                {filteredPlants.map((plant) => (
                    <div className="plant-card" key={plant.id}>
                        <h2>{plant.name}</h2>
                        <p>Sunlight: {plant.sunlight}</p>
                        <p>Bloom Season: {plant.bloomseason}</p>
                        <p>Height: {plant.plantheight} ft</p>
                        <button onClick={() => toggleFavorite(plant.id)}>
                            {favorites.includes(plant.id)
                                ? "Remove from Favorites"
                                : "Add to Favorites"}
                        </button>
                    </div>
    ))}
    </div>
        )}
        </div>
    );
}

export default App;