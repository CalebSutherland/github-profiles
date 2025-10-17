import { useState } from "react";
import "./App.css";

function ProfileCard({ profile }) {
  const username = profile.login;
  const avatar_url = profile.avatar_url;
  const bio = profile.bio ?? "No bio";
  const followers = profile.followers;
  const following = profile.following;
  const url = profile.html_url;
  const public_repos = profile.public_repos;

  return (
    <div className="profile-card">
      <img src={avatar_url} alt={`${username}'s avatar`} className="avatar" />
      <p className="profile-title">{profile.login}</p>
      <div className="profile-followers">
        <div>
          <p className="follower-value">{followers}</p>
          <p className="follower-label">followers</p>
        </div>
        <div>
          <p className="follower-value">{following}</p>
          <p className="follower-label">following</p>
        </div>
      </div>
      <p className="bio">{bio}</p>
      <p>
        <b>Public Repos:</b> {public_repos}
      </p>
      <a href={url} target="_blank">
        Profile
      </a>
    </div>
  );
}

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
      {profile && <ProfileCard profile={profile} />}
    </div>
  );
}

export default App;
