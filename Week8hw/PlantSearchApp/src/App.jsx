import { useState } from 'react';
import "./App.css";

const plants = [
     {
        name: "Edward Goucher",
        scientific_name: "Rosa 'Edward Goucher'",
        soil_type: "Loamy",
        sunlight: "Full Sun",
        bloomseason: "Fall",
        plantheight: 3
    },
    {
        name: "Kaleidoscope",
        scientific_name: "Rosa 'Kaleidoscope'",
        soil_type: "Sandy",
        sunlight: "Partial Sun",
        bloomseason: "Spring",
        plantheight: 2
    },
    {
        name: "Mardi Gras",
        scientific_name: "Rosa 'Mardi Gras'",
        soil_type: "Clay",
        sunlight: "Full Sun",
        bloomseason: "Spring",
        plantheight: 3
    },     
    {
        name: "Radiance",
        scientific_name: "Rosa 'Radiance'",
        soil_type: "Loamy",
        sunlight: "Partial Sun",
        bloomseason: "Summer",
        plantheight: 2
    },    
    {
        name: "Glossy Abelia",
        scientific_name: "Abelia x grandiflora",
        soil_type: "Sandy",
        sunlight: "Full Sun",
        bloomseason: "Summer",
        plantheight: 6
    },
    {
        name: "Hopleys",
        scientific_name: "Abelia x grandiflora 'Hopleys'",
        soil_type: "Clay",
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
                        <p>Scientific Name: {plant.scientific_name}</p>
                        <p>Soil Type: {plant.soil_type}</p>
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