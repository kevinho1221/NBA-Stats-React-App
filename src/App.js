import React, { useEffect, useState } from "react";
import "./App.css";
import Player from "./Player";

const App = () => {
  useEffect(() => {
    getStats();
  }, []);

  const [p1stats, setP1stats] = useState([]);
  const [categories] = [
    { player_id: "Name", pts: "Points", reb: "Rebounds", ast: "Assists" }
  ];

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
      <div className="p1-stats">
        <Player stats={p1stats}></Player>
      </div>
      <div className="categories">
        <Player stats={categories}></Player>
      </div>
      <div className="p2-stats">
        <h1>100</h1>
        <h1>100</h1>
        <h1>100</h1>
        <h1>100</h1>
      </div>
    </div>
  );
};

export default App;
