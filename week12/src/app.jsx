import {useEffect, useState} from 'react';

const emptyForm = {
    name: '',
    species: '',
    habitat: '',
    rarity: '',
    description: ''
};

function App() {
    const [creatures, setCreatures] = useState([]);
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    async function loadCreatures(searchTerm = search) {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`/api/creatures?search=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Error fetching creatures: ${response.statusText}`);
            }
            setCreatures(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
}

useEffect(() => {
    loadCreatures();
}, []);

function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
}

function handleSearchChange(event) {
    setSearch(event.target.value);
}

//create creature/update
async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/creatures/${editingId}` : '/api/creatures';

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
       const data = await response.json();
       if (!response.ok) {
            throw new Error(data.message || 'Error saving creature');
        }

        setFormData(emptyForm);
        setEditingId(null);
        setMessage(editingId ? 'Creature updated successfully!' : 'Creature created successfully!');
        loadCreatures();
    } catch (err) {
        setError(err.message);
    }   
}

//edit creature
function handleEdit(creature) {
    setEditingId(creature._id);
    setFormData({
        name: creature.name,
        species: creature.species,
        habitat: creature.habitat,
        rarity: creature.rarity,
        description: creature.description
    });
    setMessage('');
    setError('');
}

//delete creature
async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this creature?")) return;

    try {
        const response = await fetch(`/api/creatures/${id}`, { method: 'DELETE' });
       const data = await response.json();
       if (!response.ok) {
            throw new Error(data.message || 'Error deleting creature');
        }

        setMessage('Creature deleted successfully!');
        await loadCreatures();
        if (editingId === id) {
            cancelEdit();
        }
    } catch (err) {
        setError(err.message);
    }

    function cancelEdit() {
        setEditingId(null);
        setFormData(emptyForm);
        setMessage('');
        setError('');
    }
}

//search 
function handlesearchTerm(event) {
    const value = event.target.value;
    setSearch(value);
    loadCreatures(value);
}

return (
    <main className="container">
        <header className="hero">
            <p className="hero-text">Creature Management</p>
            <h1>Creature Catalog</h1>
            <p>Search, create, update, or delete a collection of mythical creatures.</p>
        </header>

        <section className="panel">
            <h2>{editingId ? 'Edit Creature' : 'Create Creature'}</h2>
            <form onSubmit={handleSubmit} className="creature-form">
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
            </form>
        </section>

}

};

export default App;