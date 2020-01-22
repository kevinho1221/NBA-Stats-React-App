import React from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

class searchbar extends React.Component {
  state = {
    value: "",
    suggestions: []
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
    if (value === "" || value.length < 3) {
      return;
    }
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players?search=${value}`
    );

    const data = await response.json();
    console.log(data);

    this.setState({ suggestions: data });
    console.log(this.state.suggestions);
  }

  handleInputChange = value => {
    this.setState({ value: value.target.value });
    this.getName();
    console.log(value.target.value);
  };

  render() {
    return (
      <div>
        <form className="p-form">
          <input
            className="p-searchbar"
            onChange={this.handleInputChange}
          ></input>
        </form>
      </div>
    );
  }
}

export default searchbar;
