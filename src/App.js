import React, { useEffect, useState } from "react";
import "./App.css";
import Player from "./Player";

const App = () => {
  useEffect(() => {
    getStats();
  }, []);

  const [p1stats, setP1stats] = useState([]);

  const getStats = async () => {
    //uses backticks in the line below
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=115`
    );
    const data = await response.json();
    //setRecipes(data.hits);
    //console.log(data);

    const fieldgoalsm = data.data.map(stats => {
      console.log(stats.fgm, stats.ftm);
      setP1stats(stats);
    });
  };

  return (
    <div className="App">
      <form className="p1-form">
        <input className="p1-searchbar" value="Enter Player Name"></input>
      </form>
      <form className="p2-form">
        <input className="p2-searchbar" value="Enter Player Name"></input>
      </form>
      <button className="compare-button">Compare</button>
      <div className="categories">
        <h1>Name</h1>
        <h1>Points</h1>
        <h1>Rebounds</h1>
        <h1>Assists</h1>
      </div>
      <div className="p1-stats">
        <Player stats={p1stats}></Player>
      </div>
    </div>
  );
};

export default App;
