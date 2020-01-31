import React, { useEffect, useState, Component } from "react";
import "./App.css";
import Player from "./Player";
import SearchBar from "./Search/searchbar";

class App extends Component {
  state = {
    p1SearchValue: "",
    p2SearchValue: "",
    p1SearchNumber: 115,
    p2SearchNumber: 100,
    p1Stats: {},
    p2Stats: {},
    categories: {
      player_id: "Name",
      pts: "Points",
      reb: "Rebounds",
      ast: "Assists"
    }
  };
  getStats = async () => {
    //uses backticks in the line below
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${this.state.p1SearchNumber}`
    );
    const data = await response.json();
    //setRecipes(data.hits);
    //console.log(data);

    const fieldgoalsm = data.data.map(stats => {
      console.log(stats.fgm, stats.ftm);
      this.setState({ p1Stats: stats });
    });
  };

  componentDidMount() {
    this.getStats();
  }

  updateP1SearchValue = value => {
    this.setState({ p1SearchValue: value }, () => {
      console.log(this.state.p1SearchValue);
    });
  };

  updateP1SearchNumber = number => {
    this.setState({ p1SearchNumber: number }, () => {
      console.log(this.state.p1SearchNumber);
    });
  };

  updateP2SearchValue = value => {
    this.setState({ p2SearchValue: value }, () => {
      console.log(this.state.p2SearchValue);
    });
  };

  updateP2SearchNumber = number => {
    this.setState({ p2SearchNumber: number }, () => {
      console.log(this.state.p2SearchNumber);
    });
  };

  render() {
    /*const [p1stats, setP1stats] = useState([]);
    const [categories] = [
      { player_id: "Name", pts: "Points", reb: "Rebounds", ast: "Assists" }
    ];*/

    return (
      <div className="App">
        <div className="p1-searchbar">
          <SearchBar
            value={this.state.p1SearchValue}
            updatePSearchValue={this.updateP1SearchValue}
            updatePSearchNumber={this.updateP1SearchNumber}
          />
        </div>
        <div className="p2-searchbar">
          <SearchBar
            value={this.state.p2SearchValue}
            updatePSearchValue={this.updateP2SearchValue}
            updatePSearchNumber={this.updateP2SearchNumber}
          />
        </div>
        <button className="compare-button">Compare</button>
        <div className="p1-stats">
          <Player stats={this.state.p1Stats}></Player>
        </div>
        <div className="categories">
          <Player stats={this.state.categories}></Player>
        </div>
        <div className="p2-stats">
          <h1>100</h1>
          <h1>100</h1>
          <h1>100</h1>
          <h1>100</h1>
        </div>
      </div>
    );
  }
}

export default App;
