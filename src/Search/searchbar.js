import React, { Component } from "react";
import Suggestions from "./suggestions";

class searchbar extends React.Component {
  state = {
    value: this.props.value,
    suggestions: [],
    checkedSuggestions: [],
    sugg1: [],
    sugg2: [],
    sugg3: [],
    sugg4: [],
    sugg5: [],
    isOpen: false,
    selectedName: ""
  };

  async getName() {
    const { value } = this.state;
    //console.log(this.state.suggestions);
    if (value === "" || value.length < 4) {
      this.setState({ sugg1: [] });
      this.setState({ sugg2: [] });
      this.setState({ sugg3: [] });
      this.setState({ sugg4: [] });
      this.setState({ sugg5: [] });
      this.setState({ isOpen: false });
      return;
    }

    //fetches top 100 search results if the current user input is more 4 or more letters long
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players?search=${value}&per_page=100`
    );
    //console.log(response);

    const data = await response.json();
    //console.log(data);

    this.setState({ suggestions: data });
    this.checkSuggestionLength(this.state.suggestions);
  }

  /*Iterates through the suggestions pulled from the API search at a specific point, which
  is passed into this function. Returns the index number of the next valid player, the total
  count of player objects left to be iterate through, and the running number of suggestions 
  to be displayed (incremented each time the next valid player is found)*/
  checkActive = (
    num,
    totalcount,
    origtotalcount,
    numOfSuggestions,
    checkFirst
  ) => {
    /*check to see if there is only one search result, if there is then set the
    suggestions to show only 1 item*/
    if (checkFirst == true) {
      if (totalcount == 1) {
        return {
          num: num,
          count: totalcount,
          //name: this.state.suggestions.data[num].last_name,
          suggestions: 1
        };
      }
    }

    /*Checks to make sure that the number of suggestions stay when the iteration gets to the last
    player in the json file array*/
    if (num == origtotalcount - 1) {
      return {
        num: num,
        count: totalcount,
        //name: this.state.suggestions.data[num].last_name,
        suggestions: numOfSuggestions
      };
    }

    //checking to see if totalcount is 0 because it means there are no valid suggestions left
    if (totalcount == 0 || num >= origtotalcount - 1) {
      return {
        num: num,
        count: totalcount,
        //name: this.state.suggestions.data[num].last_name,
        suggestions: numOfSuggestions
      };
    }

    /*since the height field is null for players who are too old, I'm using that to 
    determine whether or not a player is active*/
    var i = num + 1;
    var height = this.state.suggestions.data[i].height_feet;

    if (height == null) {
      while (height == null && i < origtotalcount - 1) {
        i = i + 1;
        totalcount = totalcount - 1;
        height = this.state.suggestions.data[i].height_feet;
      }

      //if height is null here then that means iteration has reached the end,
      //meaning another suggestion should not be added
      if (height == null) {
        numOfSuggestions = numOfSuggestions - 1;
      }
    } else {
      totalcount = totalcount - 1;
    }

    //Checks to see if the index is at the end of the player array
    /*If it is at the end, subtracts one from the number of suggestions so that when 1 is added
    in the return statement, it is neautralized*/

    if (num == origtotalcount - 1) {
      numOfSuggestions = numOfSuggestions - 1;
    }

    return {
      num: i,
      count: totalcount,
      name: this.state.suggestions.data[i].last_name,
      suggestions: numOfSuggestions + 1
    };
  };

  //Determines how many suggestions should be displayed based on the current user input
  checkSuggestionLength = data => {
    //console.log(data.meta.total_count);

    var start = 0;
    var totalcount = data.meta.total_count;
    var origtotalcount = data.meta.total_count;
    var numOfSuggestions = 0;

    //returns if there are no search results, for example if an invalid name is searched
    if (totalcount == 0) {
      return;
    }

    const checka = this.checkActive(
      start,
      totalcount,
      origtotalcount,
      numOfSuggestions,
      true
    );
    var a = checka.num;
    totalcount = checka.count;
    numOfSuggestions = checka.suggestions;
    //console.log(a, totalcount, checka.name, numOfSuggestions);

    const checkb = this.checkActive(
      a,
      totalcount,
      origtotalcount,
      numOfSuggestions
    );
    var b = checkb.num;
    totalcount = checkb.count;
    numOfSuggestions = checkb.suggestions;
    //console.log(b, totalcount, checkb.name, numOfSuggestions);

    const checkc = this.checkActive(
      b,
      totalcount,
      origtotalcount,
      numOfSuggestions
    );
    var c = checkc.num;
    totalcount = checkc.count;
    numOfSuggestions = checkc.suggestions;
    //console.log(c, totalcount, checkc.name, numOfSuggestions);

    const checkd = this.checkActive(
      c,
      totalcount,
      origtotalcount,
      numOfSuggestions
    );
    var d = checkd.num;
    totalcount = checkd.count;
    numOfSuggestions = checkd.suggestions;
    //console.log(d, totalcount, checkd.name, numOfSuggestions);

    const checke = this.checkActive(
      d,
      totalcount,
      origtotalcount,
      numOfSuggestions
    );
    var e = checke.num;
    totalcount = checke.count;
    numOfSuggestions = checke.suggestions;
    //console.log(e, totalcount, checke.name, numOfSuggestions);

    this.setState({ isOpen: true });

    //console.log(numOfSuggestions);
    if (numOfSuggestions >= 5) {
      this.setState({ sugg1: this.state.suggestions.data[a] });
      this.setState({ sugg2: this.state.suggestions.data[b] });
      this.setState({ sugg3: this.state.suggestions.data[c] });
      this.setState({ sugg4: this.state.suggestions.data[d] });
      this.setState({ sugg5: this.state.suggestions.data[e] });
    } else if (numOfSuggestions === 4) {
      this.setState({ sugg1: this.state.suggestions.data[a] });
      this.setState({ sugg2: this.state.suggestions.data[b] });
      this.setState({ sugg3: this.state.suggestions.data[c] });
      this.setState({ sugg4: this.state.suggestions.data[d] });
      this.setState({ sugg5: [] });
    } else if (numOfSuggestions === 3) {
      this.setState({ sugg1: this.state.suggestions.data[a] });
      this.setState({ sugg2: this.state.suggestions.data[b] });
      this.setState({ sugg3: this.state.suggestions.data[c] });
      this.setState({ sugg4: [] });
      this.setState({ sugg5: [] });
    } else if (numOfSuggestions === 2) {
      this.setState({ sugg1: this.state.suggestions.data[a] });
      this.setState({ sugg2: this.state.suggestions.data[b] });
      this.setState({ sugg3: [] });
      this.setState({ sugg4: [] });
      this.setState({ sugg5: [] });
    } else if (numOfSuggestions === 1) {
      this.setState({ sugg1: this.state.suggestions.data[a] });
      this.setState({ sugg2: [] });
      this.setState({ sugg3: [] });
      this.setState({ sugg4: [] });
      this.setState({ sugg5: [] });
    } else {
      this.setState({ sugg1: [] });
      this.setState({ sugg2: [] });
      this.setState({ sugg3: [] });
      this.setState({ sugg4: [] });
      this.setState({ sugg5: [] });
    }
  };

  handleInputChange = value => {
    var theValue = value.target.value;

    //reads user input while changing the state
    this.setState({ value: theValue }, this.getName);
  };

  //Fills in the input box with the selected player and updates the program's search number
  handleSelection = e => {
    const thehtml = e.target.innerHTML;
    this.props.updatePSearchValue(thehtml);

    if (e.target.className === "suggTop") {
      this.props.updatePSearchNumber(this.state.sugg1.id);
    } else if (e.target.className === "suggTopMid") {
      this.props.updatePSearchNumber(this.state.sugg2.id);
    } else if (e.target.className === "suggMid") {
      this.props.updatePSearchNumber(this.state.sugg3.id);
    } else if (e.target.className === "suggBotMid") {
      this.props.updatePSearchNumber(this.state.sugg4.id);
    } else if (e.target.className === "suggBot") {
      this.props.updatePSearchNumber(this.state.sugg5.id);
    }

    this.setState({ value: thehtml });
    this.setState({ isOpen: false });
  };

  //prevents submission when pressing enter
  submitHandler = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="p-searchsection">
        <form className="p-form" onSubmit={this.submitHandler}>
          <input
            className="p-searchbar"
            value={this.state.value}
            placeholder="Enter Player Name:"
            onChange={this.handleInputChange}
          ></input>
        </form>
        <div className="p-suggestions">
          <Suggestions
            sugg1={this.state.sugg1}
            sugg2={this.state.sugg2}
            sugg3={this.state.sugg3}
            sugg4={this.state.sugg4}
            sugg5={this.state.sugg5}
            isOpen={this.state.isOpen}
            handler={this.handleSelection}
          ></Suggestions>
        </div>
      </div>
    );
  }
}

export default searchbar;
