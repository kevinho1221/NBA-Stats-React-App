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
    p1Name: "",
    p2Name: "",
    p1Stats: {},
    p2Stats: {},
    categories: {},
    isSearched: false,
    isPressed: false,
    //for scrolling
    myRef: React.createRef(),
    shouldScroll: false
  };

  compareOnClick = () => {
    var goodInputs = this.checkInputs();

    if (goodInputs) {
      this.setState({
        categories: {
          name: "Name",
          player_id: "Categories"
        }
      });
      this.updateIsPressed(true);
      this.getStats();
    } else {
      window.alert("Please enter a name for both players!");
    }
  };

  //Checks to see if the either of the inputs are blank
  checkInputs = () => {
    console.log(this.state.p1SearchValue.length);
    if (this.state.p1SearchValue != "" && this.state.p2SearchValue != "") {
      return true;
    } else {
      return false;
    }
  };

  /*main function that is used after the Compare button is clicked the retrieves player data
  from the API*/
  getStats = async () => {
    //uses backticks in the line below
    const response1 = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${this.state.p1SearchNumber}`
    );
    const data1 = await response1.json();

    const response2 = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${this.state.p2SearchNumber}`
    );
    const data2 = await response2.json();

    //console.log(data1);
    //console.log(data2);

    //checks if the player played in the 2018 season
    if (data1.data.length === 0) {
      window.alert(
        this.state.p1SearchValue +
          " did not play in the 2018 season! \n Please enter another player name!"
      );
    } else if (data2.data.length === 0) {
      window.alert(
        this.state.p2SearchValue +
          " did not play in the 2018 season! \n Please enter another player name!"
      );
    } else {
      const setP1State = data1.data.map(stats => {
        console.log(stats.fgm, stats.ftm);
        this.setState({ p1Stats: stats });
      });
      const setP2State = data2.data.map(stats => {
        console.log(stats.fgm, stats.ftm);
        this.setState({ p2Stats: stats });
      });

      //only scrolls and updates here if the player has played in 2018
      this.setState({ shouldScroll: true });
      this.setState({ p1Name: this.state.p1SearchValue });
      this.setState({ p2Name: this.state.p2SearchValue });
    }

    if (this.state.shouldScroll == true) {
      this.scroll(this.state.myRef);
    }

    //sets the scroll back to false at the end to reset for next search
    this.setState({ shouldScroll: false });

    //console.log(this.state.handleFirstInvalidInput);
  };

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

  //updates the IsPressed state to signal when the compare button is pressed
  //Used so that the Player object only displays when the compare button is pressed
  updateIsPressed = value => {
    this.setState({ isPressed: value });
  };

  scroll(ref) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <div className="App">
        <div className="Season">
          <h1>2018-2019 Season Comparison</h1>
        </div>
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
        <div className="buttonSection">
          <button className="compare-button" onClick={this.compareOnClick}>
            Compare
          </button>
        </div>

        <div className="p1-stats" ref={this.state.myRef}>
          <Player
            stats={this.state.p1Stats}
            name={this.state.p1Name}
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
            name={this.state.p2Name}
            isPressed={this.state.isPressed}
          ></Player>
        </div>
      </div>
    );
  }
}

export default App;
