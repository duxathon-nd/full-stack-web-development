import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  species: "",
  habitat: "",
  rarity: "Common",
  description: "",
};

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadPokemon(searchTerm = search) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/pokemon?search=${encodeURIComponent(searchTerm)}`,
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to load pokemon");
      }
      setPokemon(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPokemon();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  //create pokemon/update
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/pokemon/${editingId}` : "/api/pokemon";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to save pokemon");
      }

      setFormData(emptyForm);
      setEditingId(null);
      setMessage(
        editingId
          ? "pokemon updated successfully!"
          : "Pokemon created successfully!",
      );
      await loadPokemon();
    } catch (err) {
      setError(err.message);
    }
  }

  //edit pokemon
  function handleEdit(pokemon) {
    setEditingId(pokemon._id);
    setFormData({
      name: pokemon.name,
      type: pokemon.type,
      rarity: pokemon.rarity,
      description: pokemon.description,
    });
    setMessage("");
    setError("");
  }

  //delete pokemon
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this pokemon?")) return;
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/pokemon/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to delete pokemon");
      }

      setMessage("Pokemon deleted successfully!");
      await loadPokemon();
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
    loadPokemon(value);
  }

  return (    
    <main className="container">
      <Login />
        <header className="hero">
            <p className="hero-text">Pokemon Management</p>
            <h1>Pokemon Catalog</h1>
            <p>Search, create, update, or delete a collection of pokemon.</p>
        </header>

        <section className="panel">
            <h2>{editingId ? "Edit Pokemon" : "Create Pokemon"}</h2>
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
                    type:
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
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
                <button type="submit"> {editingId ? "Save Pokemon" : "Add Pokemon"} </button>
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
                    <h2>Pokemon Catalog</h2>
                    <p>All pokemon in the database</p>
                </div>
                <input
                clsassName="search"
                type="search"
                placeholder="Search by name, type, or rarity"
                value={search}
                onChange={handleSearch}
                />
            </div>
            {loading ? (
                <p>Loading pokemon...</p>
            ) : error ? (
                <p className="error" role="alert">{error}</p>
            ) : pokemon.length === 0 ? (
                <p>No pokemon found.</p>
            ) : (
                <ul className="plant-list">
                    {pokemon.map((poke) => (
                        <li key={poke._id} className="plant-card">
                            <h3>{poke.name}</h3>
                            <p><strong>type:</strong> {poke.type}</p>
                            <p><strong>Rarity:</strong> {poke.rarity}</p>
                            <p><strong>Description:</strong> {poke.description}</p>
                            <div className="card-actions">
                                <button onClick={() => handleEdit(poke)}>Edit</button>
                                <button onClick={() => handleDelete(poke._id)} className="delete-button">Delete</button>
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