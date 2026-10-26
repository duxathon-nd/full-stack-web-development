import {useState} from "react";
import "./App.css";

function App() {
  // variable
  const [catImage, setCatImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // function to fetch cat image. 
  const getCat = async () => {
    setLoading(true);
    setError("");

    try {
      //get request
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=1", {
        headers: { "x-api-key": "live_YHjHABJBuFRS2tpNLC9bVBjMNRa0iJdrilbuazKX3NzHpIRGrZYYuQJ3Goneqlil" },
      });
      const data = await response.json();
      console.log(data);
      //check for error
      if(!response.ok){
        throw new Error("Failed to fetch cat image");
      }
      //parse the JSON response
      setCatImage(data[0].url);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

return (
  <div className="App">
  <div className="cat-card">
  <h1>Random Cat App</h1>
  <button onClick={getCat}>Get a Cat!</button>

  {loading && <p>Loading cat image...</p>}

  {error && <p className="error">{error}</p>}

  {/* Display the cat image if real */}
  {catImage && !loading && (
    <div>
      <h2>Look at this cat!</h2>
      <img
      src={catImage}
      alt="Random Cat"
      className="cat-image"
      />
    </div>
  )}
  </div>
  </div>
);
}

export default App;