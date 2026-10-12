function PlantCard(props) {
    return (
        <article className="plant-card">
            <h2>{props.name}</h2>
            <p>Plant Height: {props.plantheight}</p>
            <p>Bloom Season: {props.bloomseason}</p>
            <p>Sunlight: {props.sunlight}</p>
        </article>
    );
}

export default PlantCard;