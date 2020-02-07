import React, { Component } from "react";
import Suggestions from "./suggestions";

class searchbar extends React.Component {
  state = {
    value: this.props.value,
    suggestions: [],
    sugg1: [],
    sugg2: [],
    sugg3: [],
    sugg4: [],
    sugg5: [],
    isOpen: false,
    selectedName: "",
    isPressed: this.props.isPressed
  };

  async getName() {
    const { value } = this.state;
    console.log(this.state.suggestions);
    if (value === "" || value.length < 3) {
      this.setState({ sugg1: [] });
      this.setState({ sugg2: [] });
      this.setState({ sugg3: [] });
      this.setState({ sugg4: [] });
      this.setState({ sugg5: [] });
      this.setState({ isOpen: false });
      return;
    }
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players?search=${value}`
    );

    const data = await response.json();
    console.log(data);

    this.setState({ suggestions: data });
    this.checkSuggestionLength(this.state.suggestions);
  }

  checkSuggestionLength = data => {
    console.log(data.meta.total_count);
    this.setState({ isOpen: true });
    if (data.meta.total_count >= 5) {
      this.setState({ sugg1: this.state.suggestions.data[0] });
      this.setState({ sugg2: this.state.suggestions.data[1] });
      this.setState({ sugg3: this.state.suggestions.data[2] });
      this.setState({ sugg4: this.state.suggestions.data[3] });
      this.setState({ sugg5: this.state.suggestions.data[4] });
    } else if (data.meta.total_count === 4) {
      this.setState({ sugg1: this.state.suggestions.data[0] });
      this.setState({ sugg2: this.state.suggestions.data[1] });
      this.setState({ sugg3: this.state.suggestions.data[2] });
      this.setState({ sugg4: this.state.suggestions.data[3] });
      this.setState({ sugg5: [] });
    } else if (data.meta.total_count === 3) {
      this.setState({ sugg1: this.state.suggestions.data[0] });
      this.setState({ sugg2: this.state.suggestions.data[1] });
      this.setState({ sugg3: this.state.suggestions.data[2] });
      this.setState({ sugg4: [] });
      this.setState({ sugg5: [] });
    } else if (data.meta.total_count === 2) {
      this.setState({ sugg1: this.state.suggestions.data[0] });
      this.setState({ sugg2: this.state.suggestions.data[1] });
      this.setState({ sugg3: [] });
      this.setState({ sugg4: [] });
      this.setState({ sugg5: [] });
    } else if (data.meta.total_count === 1) {
      this.setState({ sugg1: this.state.suggestions.data[0] });
      this.setState({ sugg2: [] });
      this.setState({ sugg3: [] });
      this.setState({ sugg4: [] });
      this.setState({ sugg5: [] });
    }
  };

  handleInputChange = value => {
    this.setState({ value: value.target.value });
    this.getName();
  };

  handleSelection = e => {
    const thehtml = e.target.innerHTML;
    this.props.updatePSearchValue(thehtml);
    this.props.updateIsPressed(false);

    console.log(e.target.className);

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

  submitHandler = e => {
    //prevents submission when pressing enter
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
