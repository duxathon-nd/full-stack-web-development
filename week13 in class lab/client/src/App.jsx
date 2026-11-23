import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  species: "",
  habitat: "",
  rarity: "Common",
  description: "",
};

function App() {
  const [plants, setPlants] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadPlants(searchTerm = search) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/plants?search=${encodeURIComponent(searchTerm)}`,
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to load plants");
      }
      setPlants(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlants();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  //create plant/update
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/plants/${editingId}` : "/api/plants";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to save plant");
      }

      setFormData(emptyForm);
      setEditingId(null);
      setMessage(
        editingId
          ? "plant updated successfully!"
          : "Plant created successfully!",
      );
      await loadPlants();
    } catch (err) {
      setError(err.message);
    }
  }

  //edit plant
  function handleEdit(plant) {
    setEditingId(plant._id);
    setFormData({
      name: plant.name,
      height: plant.height,
      rarity: plant.rarity,
      description: plant.description,
    });
    setMessage("");
    setError("");
  }

  //delete plant
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this plant?")) return;
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/plants/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to delete plant");
      }

      setMessage("Plant deleted successfully!");
      await loadPlants();
      if (editingId === id) {
        cancelEdit();
      }
    } catch (err) {
      setError(err.message);
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setFormData(emptyForm);
    setMessage("");
    setError("");
  }

  //search
  function handleSearch(event) {
    const value = event.target.value;
    setSearch(value);
    loadPlants(value);
  }

  return (    
    <main className="container">
      <Login />
        <header className="hero">
            <p className="hero-text">Plant Management</p>
            <h1>Plant Catalog</h1>
            <p>Search, create, update, or delete a collection of plants.</p>
        </header>

        <section className="panel">
            <h2>{editingId ? "Edit Plant" : "Create Plant"}</h2>
            <form onSubmit={handleSubmit} className="plant-form">
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    height:
                    <input
                        type="text"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    rarity:
                    <input
                        type="text"
                        name="rarity"
                        value={formData.rarity}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    season:
                    <select
                        name="season"
                        value={formData.season}
                        onChange={handleChange}
                        required
                    >
                        <option value="winter">winter</option>
                        <option value="spring">spring</option>
                        <option value="summer">summer</option>
                        <option value="fall">fall</option>
                    </select>
                </label>
                <label className="wide">
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        required
                    />
                </label>
                <div className="form-actions wide">
                <button type="submit"> {editingId ? "Save Plant" : "Add Plant"} </button>
                    {editingId && (
                        <button type="button" onClick={cancelEdit} className="cancel-button">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
            {message && <p className="success" role="status">{message}</p>}
            {error && <p className="error" role="alert">{error}</p>}
        </section>

        <section className="catalog">
            <div className="catalog-header">
                <div>
                    <h2>Plant Catalog</h2>
                    <p>All plants in the database</p>
                </div>
                <input
                clsassName="search"
                type="search"
                placeholder="Search by name, season, or rarity"
                value={search}
                onChange={handleSearch}
                />
            </div>
            {loading ? (
                <p>Loading plants...</p>
            ) : error ? (
                <p className="error" role="alert">{error}</p>
            ) : plants.length === 0 ? (
                <p>No plants found.</p>
            ) : (
                <ul className="plant-list">
                    {plants.map((plant) => (
                        <li key={plant._id} className="plant-card">
                            <h3>{plant.name}</h3>
                            <p><strong>height:</strong> {plant.height}</p>
                            <p><strong>season:</strong> {plant.season}</p>
                            <p><strong>Rarity:</strong> {plant.rarity}</p>
                            <p><strong>Description:</strong> {plant.description}</p>
                            <div className="card-actions">
                                <button onClick={() => handleEdit(plant)}>Edit</button>
                                <button onClick={() => handleDelete(plant._id)} className="delete-button">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
        <section className="footer">
            <p>Created by Nate</p>
        </section>
    </main>
  );
}

export default App;