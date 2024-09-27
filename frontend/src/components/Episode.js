import React from "react";
import "./Episode.css";

const Episode = ({ title, description }) => {
  return (
    <div className="episode">
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="play-button">Play Episode</button>
    </div>
  );
};

export default Episode;
