import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Episode from "./components/Episode";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  // Step 1: Set up a state to store episodes fetched from the backend
  const [episodes, setEpisodes] = useState([]);

  // Step 2: Fetch episodes from Flask API when the component mounts
  useEffect(() => {
    fetch('/api/episodes')
      .then(response => response.json())
      .then(data => setEpisodes(data))
      .catch(error => console.error("Error fetching episodes:", error));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <header className="hero">
        <h1>Welcome to the Very Chaotic Podcast</h1>
        <p>Embrace the chaos! Enjoy episodes filled with humor, drama, and surprises!</p>
        <button className="cta-button">Listen to the Latest Episode</button>
      </header>
      <section className="episodes">
        <h2>Episodes</h2>
        <div className="episode-list">
          {/* Step 3: Dynamically render episodes fetched from the API */}
          {episodes.map((episode) => (
            <Episode
              key={episode.id}
              title={episode.title}
              description={episode.description}
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
