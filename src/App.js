import React, { useEffect, useState, Component } from "react";
import "./App.css";
import Player from "./Player";
import SearchBar from "./Search/searchbar";

class App extends Component {
  state = {
    p1SearchValue: "",
    p2SearchValue: "",
    p1SearchNumber: 1,
    p2SearchNumber: 1,
    p1Stats: {},
    p2Stats: {},
    categories: {},
    isSearched: false,
    isPressed: false
  };

  checkInputs = () => {
    console.log(this.state.p1SearchValue.length);
    if (this.state.p1SearchValue != "" && this.state.p2SearchValue != "") {
      return true;
    } else {
      return false;
    }
  };

  getStats = async () => {
    //uses backticks in the line below
    const response1 = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${this.state.p1SearchNumber}`
    );
    const data1 = await response1.json();

    console.log(data1);

    //checks if the player played in the 2018 season
    if (data1.data.length === 0) {
      window.alert(
        this.state.p1SearchValue +
          " did not play in the 2018 season! \n Please enter another player name!"
      );
    }

    const setP1State = data1.data.map(stats => {
      console.log(stats.fgm, stats.ftm);
      this.setState({ p1Stats: stats });
    });

    const response2 = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${this.state.p2SearchNumber}`
    );
    const data2 = await response2.json();

    //checks if the player played in the 2018 season
    if (data2.data.length === 0) {
      window.alert(
        this.state.p2SearchValue +
          " did not play in the 2018 season! \n Please enter another player name!"
      );
    }
    console.log(data2);
    const setP2State = data2.data.map(stats => {
      console.log(stats.fgm, stats.ftm);
      this.setState({ p2Stats: stats });
    });
  };

  /*componentDidMount() {
    this.getStats();
  }*/

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

  updateIsPressed = value => {
    this.setState({ isPressed: value });
  };

  compareOnClick = () => {
    var goodInputs = this.checkInputs();

    if (goodInputs) {
      this.setState({
        categories: {
          name: "Name",
          player_id: "Player ID",
          pts: "Points",
          reb: "Rebounds",
          ast: "Assists"
        }
      });
      this.updateIsPressed(true);
      this.getStats();
    } else {
      window.alert("Please enter a name for both players!");
    }
  };

  render() {
    return (
      <div className="App">
        <div className="p1-searchbar">
          <SearchBar
            value={this.state.p1SearchValue}
            updatePSearchValue={this.updateP1SearchValue}
            updatePSearchNumber={this.updateP1SearchNumber}
            updateIsPressed={this.updateIsPressed}
          />
        </div>
        <div className="p2-searchbar">
          <SearchBar
            value={this.state.p2SearchValue}
            updatePSearchValue={this.updateP2SearchValue}
            updatePSearchNumber={this.updateP2SearchNumber}
            updateIsPressed={this.updateIsPressed}
          />
        </div>
        <button className="compare-button" onClick={this.compareOnClick}>
          Compare
        </button>
        <div className="p1-stats">
          <Player
            stats={this.state.p1Stats}
            name={this.state.p1SearchValue}
            isPressed={this.state.isPressed}
          ></Player>
        </div>
        <div className="categories">
          <Player
            stats={this.state.categories}
            name={this.state.categories.name}
            isPressed={this.state.isPressed}
          ></Player>
        </div>
        <div className="p2-stats">
          <Player
            stats={this.state.p2Stats}
            name={this.state.p2SearchValue}
            isPressed={this.state.isPressed}
          ></Player>
        </div>
      </div>
    );
  }
}

export default App;
