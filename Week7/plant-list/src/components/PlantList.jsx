import PlantCard from './PlantCard';

function PlantList() {
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

    return (
        <section>
            <h2>Plants</h2>
            <div className="plant-list">
            {plants.map((plant, index) => (
                <PlantCard
                    key={index}
                    name={plant.name}
                    plantheight={plant.plantheight}
                    bloomseason={plant.bloomseason}
                    sunlight={plant.sunlight}
                />
            ))}
           </div>
        </section>
    );
}
export default PlantList;