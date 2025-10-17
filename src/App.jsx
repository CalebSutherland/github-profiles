import { useState } from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = async (username) => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      console.log(data);
      setProfile(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSearch = () => {
    fetchProfile(userInput);
  };

  return (
    <div>
      <h1>Github Profiles</h1>

      <div>
        <input type="text" value={userInput} onChange={handleInput} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}

export default App;
