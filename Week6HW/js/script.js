const plants = [
    {
        name: "Edward Goucher",
        sunlight: "Full Sun",
        "bloom season": "Fall",
        "plant height": 3
    },
    {
        name: "Kaleidoscope",
        sunlight: "Partial Sun",
        "bloom season": "Spring",
        "plant height": 2
    },
    {
        name: "Mardi Gras",
        sunlight: "Full Sun",
        "bloom season": "Spring",
        "plant height": 3
    },     
    {
        name: "Radiance",
        sunlight: "Partial Sun",
        "bloom season": "Summer",
        "plant height": 2
    },    
    {
        name: "Glossy Abelia",
        sunlight: "Full Sun",
        "bloom season": "Summer",
        "plant height": 6
    },
    {
        name: "Hopleys",
        sunlight: "Partial Sun",
        "bloom season": "Fall",
        "plant height": 5
    },
    {
        name: "Little Richard",
        sunlight: "Full Sun",
        "bloom season": "Spring",
        "plant height": 2
    },    
    {
        name: "Okra",
        sunlight: "Full Sun",
        "bloom season": "Summer",
        "plant height": 5
    },        
    {
        name: "Sunset Muskmallow",
        sunlight: "Full Sun",
        "bloom season": "Fall",
        "plant height": 9
    },    
    {
        name: "Silver Fir",
        sunlight: "Full Sun",
        "bloom season": "Winter",
        "plant height": 50
    },    
    {
        name: "Spreading Star",
        sunlight: "Shade",
        "bloom season": "Fall",
        "plant height": 2
    },    
    {
        name: "Balasm Fir",
        sunlight: "Full Sun",
        "bloom season": "Fall",
        "plant height": 50
    },    
    {
        name: "Nana",
        sunlight: "Full Sun",
        "bloom season": "Fall",
        "plant height": 1
    },
    {
        name: "Meyer's Dwarf",
        sunlight: "Full Sun",
        "bloom season": "Spring",
        "plant height": 2
    },
    {
        name: "Plant 15",
        sunlight: "o",
        "bloom season": "o",
        "plant height": 15
    },          
    {
        name: "Greek Fir",
        sunlight: "Full Sun",
        "bloom season": "Summer",
        "plant height": 100
    },   
    {
        name: "Plant 17",
        sunlight: "q",
        "bloom season": "q",
        "plant height": 17
    },   
    {
        name: "White Fir",
        sunlight: "Partial Sun",
        "bloom season": "Fall",
        "plant height": 6
    },   
    {
        name: "Candicans",
        sunlight: "Full Sun",
        "bloom season": "Spring",
        "plant height": 30
    },   
    {
        name: "Compacta",
        sunlight: "Partial Sun",
        "bloom season": "Spring",
        "plant height": 3
    },   
];

// Javascript functions
//display plants
function displayPlants(plantArray) {
    const plantList = document.getElementById("plantList");
    plantList.innerHTML = ""; // Clear existing content
    //map()
    plantArray.map((plant) => {
        plantList.innerHTML += `
            <div class="plant">
                <h2>${plant.name}</h2>
                <p>sunlight: ${plant.sunlight}</p>
                <p>bloom season: ${plant["bloom season"]}</p>
                <p class="rating">Plant height: ${plant["plant height"]}</p>
            </div>
        `;
    });
}

//show all plants
function showAllPlants() {
    displayPlants(plants);
}

//sort()
function sortAlphabetically() {
    const sortedPlants = [...plants].sort((a,b) => {
        return a.name.localeCompare(b.name);
    });
    displayPlants(sortedPlants);
}

//filter()
function filterBySunlight(){
    const sunlightInput = prompt("Enter a sunlight requirement to filter by (e.g., Full Sun, Partial Shade):");
    if(!sunlightInput) {
        alert("No sunlight requirement entered. Please try again.");
        return;
    }
    const filteredPlants = plants.filter(plant => plant.sunlight.toLowerCase() === sunlightInput.toLowerCase());

    displayPlants(filteredPlants);
}

//filter by Bloom Season
function filterByBloomSeason() {
    const bloomSeasonInput = prompt("Enter a bloom season to filter by (e.g., Spring, Summer):");
    if(!bloomSeasonInput) {
        alert("No bloom season entered. Please try again.");
        return;
    }
    const filteredPlants = plants.filter(plant => plant["bloom season"].toLowerCase() === bloomSeasonInput.toLowerCase());

    displayPlants(filteredPlants);
}

//filter by Height
function filterByHeight() {
    const filteredTallPlants = plants.filter(plant => plant["plant height"] >= 2);
    displayPlants(filteredTallPlants);
}

//find specific Plant
function findPlant() {
    const nameInput = prompt("Enter the name of the plant to find:");

    const plantFound = plants.find(plant => plant.name.toLowerCase() === nameInput.toLowerCase());
    if (plantFound) {
        displayPlants([plantFound]);
    } else {
        alert("Plant not found.");
    }
}

//plant stats
function showPlantStats() {
    const totalHeight = plants.reduce((total, plant) => {
         return total + plant["plant height"];
        }, 0);
    const averageHeight = (totalHeight / plants.length).toFixed(2);
    
    const stats = document.getElementById("stats");

    stats.innerHTML = `
        <h2>Plant Statistics</h2>
        <p>Total Plants: ${plants.length}</p>
        <p>Average Plant Height: ${averageHeight}</p>
    `;
}

showAllPlants(); // Display all plants on page load