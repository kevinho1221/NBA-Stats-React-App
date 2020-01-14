import React, { useEffect } from "react";
import "./App.css";

const App = () => {
  /*const getStats = async () => {
    //uses backticks in the line below
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players/?search=curry`
    );
    const data = await response.json();
    //setRecipes(data.hits);
    console.log(data);
  };

  useEffect(() => {
    getStats();
  }, []);*/

  return (
    <div className="App">
      <form className="p1-form">
        <input className="p1-searchbar" value="Enter Player Name"></input>
      </form>
      <form className="p2-form">
        <input className="p2-searchbar" value="Enter Player Name"></input>
      </form>
      <button className="compare-button">Compare</button>
    </div>
  );
};

export default App;
