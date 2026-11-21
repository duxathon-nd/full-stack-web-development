const plants = [
    {
        name: "a",
        sunlight: "a",
        "bloom season": "a",
        "plant height": 1
    },
    {
        name: "b",
        sunlight: "b",
        "bloom season": "b",
        "plant height": 2
    },
    {
        name: "c",
        sunlight: "c",
        "bloom season": "c",
        "plant height": 3
    },     
    {
        name: "d",
        sunlight: "d",
        "bloom season": "d",
        "plant height": 4
    },    
    {
        name: "e",
        sunlight: "e",
        "bloom season": "e",
        "plant height": 5
    },   
    {
        name: "f",
        sunlight: "f",
        "bloom season": "f",
        "plant height": 6
    },   
    {
        name: "g",
        sunlight: "g",
        "bloom season": "g",
        "plant height": 7
    },     
        {
        name: "h",
        sunlight: "h",
        "bloom season": "h",
        "plant height": 8
    },          
        {
        name: "i",
        sunlight: "i",
        "bloom season": "i",
        "plant height": 9
    },           
    {
        name: "j",
        sunlight: "j",
        "bloom season": "j",
        "plant height": 10
    },  
    {
        name: "k",
        sunlight: "k",
        "bloom season": "k",
        "plant height": 11
    },  
    {
        name: "l",
        sunlight: "l",
        "bloom season": "l",
        "plant height": 12
    },  
        {
        name: "m",
        sunlight: "m",
        "bloom season": "m",
        "plant height": 13
    }, 
     {
        name: "n",
        sunlight: "n",
        "bloom season": "n",
        "plant height": 14
    }, 
     {
        name: "o",
        sunlight: "o",
        "bloom season": "o",
        "plant height": 15
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

//search()
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPlants = plants.filter(plant => plant.name.toLowerCase().includes(searchTerm));
    displayPlants(filteredPlants);
});

//failed search function
function failedSearch() {
    alert("No plants found matching your search criteria.")
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