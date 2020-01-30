import React, { useEffect, useState } from "react";
import "./App.css";
import Player from "./Player";
import SearchBar from "./Search/searchbar";
import Suggestions from "./Search/suggestions";

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
      <div className="p1-searchbar">
        <SearchBar />
      </div>

      <div className="p2-searchbar">
        <SearchBar />
      </div>
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
