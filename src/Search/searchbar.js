import React from "react";
import Suggestions from "./suggestions";

class searchbar extends React.Component {
  state = {
    value: "",
    suggestions: [],
    sugg1: [{ player_id: 0, first_name: "A" }],
    sugg2: [{ player_id: 1, first_name: "B" }],
    sugg3: [{ player_id: 2, first_name: "C" }],
    sugg4: [{ player_id: 3, first_name: "D" }],
    sugg5: [{ player_id: 4, first_name: "E" }]
  };

  /*async getAllNames() {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players?search=${name}`
    );

    const data = await response.json();

    console.log(data.meta.total_pages);
    var i = 0;
    for (i = 1; i < data.meta.total_pages + 1; i++) {
      const playersloop = await fetch(
        `https://www.balldontlie.io/api/v1/players?page=${i}`
      );
    }

    this.setState({ firstnames: data.data.first_name });
    const fieldgoalsm = data.data.map(stats => {
      console.log(stats.first_name);
    });

  }

    componentDidMount() {
    //this.getAllNames();
  }
  */

  async getName() {
    const { value } = this.state;
    console.log(this.state.suggestions);
    if (value === "" || value.length < 3) {
      return;
    }
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players?search=${value}`
    );

    const data = await response.json();
    console.log(data);

    this.setState({ suggestions: data });
    this.checkSuggestionLength(this.state.suggestions);

    //this.getSuggestions();
  }

  checkSuggestionLength = data => {
    console.log(data.meta.total_count);
    if (data.meta.total_count === 4) {
      this.setState({ sugg1: this.state.suggestions.data[0] });
      this.setState({ sugg2: this.state.suggestions.data[1] });
      this.setState({ sugg3: this.state.suggestions.data[2] });
      this.setState({ sugg4: this.state.suggestions.data[3] });
      this.setState({ sugg5: [{ player_id: 4, first_name: "E" }] });
    } else if (data.meta.total_count === 3) {
      this.setState({ sugg1: this.state.suggestions.data[0] });
      this.setState({ sugg2: this.state.suggestions.data[1] });
      this.setState({ sugg3: this.state.suggestions.data[2] });
      this.setState({ sugg4: [{ player_id: 4, first_name: "D" }] });
      this.setState({ sugg5: [{ player_id: 5, first_name: "E" }] });
    } else if (data.meta.total_count === 2) {
      this.setState({ sugg1: this.state.suggestions.data[0] });
      this.setState({ sugg2: this.state.suggestions.data[1] });
      this.setState({ sugg3: [{ player_id: 3, first_name: "C" }] });
      this.setState({ sugg4: [{ player_id: 4, first_name: "D" }] });
      this.setState({ sugg5: [{ player_id: 5, first_name: "E" }] });
    } else if (data.meta.total_count === 1) {
      console.log("HELLO");
      this.setState({ sugg1: this.state.suggestions.data[0] });
      this.setState({ sugg2: [{ player_id: 2, first_name: "B" }] });
      this.setState({ sugg3: [{ player_id: 3, first_name: "C" }] });
      this.setState({ sugg4: [{ player_id: 4, first_name: "D" }] });
      this.setState({ sugg5: [{ player_id: 5, first_name: "E" }] });
    } else if (data.meta.total_count === 0) {
      this.setState({ sugg1: [{ player_id: 1, first_name: "A" }] });
      this.setState({ sugg2: [{ player_id: 2, first_name: "B" }] });
      this.setState({ sugg3: [{ player_id: 3, first_name: "C" }] });
      this.setState({ sugg4: [{ player_id: 4, first_name: "D" }] });
      this.setState({ sugg5: [{ player_id: 5, first_name: "E" }] });
    }
  };
  getSuggestions = () => {
    var i = 0;
    for (i; i < 4; i++) {
      console.log(this.state.suggestions.data[i]);
      return <div>Hello{i}</div>;
    }
  };

  handleInputChange = value => {
    this.setState({ value: value.target.value });
    this.getName();
    console.log(value.target.value);
  };

  render() {
    return (
      <div className="p1-searchsection">
        <form className="p-form">
          <input
            className="p-searchbar"
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
          ></Suggestions>
        </div>
      </div>
    );
  }
}

export default searchbar;
