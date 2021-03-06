
"use strict;"
import React from "react";
import Challenge from "./Challenge";
import Header from "./Header";
import mysql from "mysql";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      challenges: [
        {
          name: "Something",
          description:
            "A sample 100days challenge to start you off. Remove me if you like."
        }
      ],
      inputValueName: "",
      inputValueDesc: ""
    };
    this.addChallenge = this.addChallenge.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // Database connection
    const con = mysql.createConnection({
      host: "xxx",
      user: "xxx",
      password: "xxx",
      database: "xxx"
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  addChallenge(challengeName) {
    if(this.state.inputValueName === '' || this.state.inputValueDesc === '') {
      alert("Please enter a complete name and/or description for your challenge.");
    } else {
      let newChallengeList = [...this.state.challenges];
    newChallengeList.push({
      name: this.state.inputValueName,
      description: this.state.inputValueDesc
    });
    this.setState({
      inputValueName: "",
      inputValueDesc: "",
      challenges: newChallengeList
    });
    }
  }
  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="challenges-form">
          <h2>Why not add a challenge?</h2>
          <label for="inputValueName">#100DaysOf</label>
          <input
            value={this.state.inputValueName}
            id="inputValueName"
            name="inputValueName"
            onChange={this.handleChange}
            type="text"
          />
          <label for ="inputValueDesc">Description</label>
          <input
            value={this.state.inputValueDesc}
            id="inputValueDesc"
            name="inputValueDesc"
            onChange={this.handleChange}
            type="text"
          />
          <button onClick={this.addChallenge}>Add Challenge</button>
        </div>
        <div className="challenges-container">
          {this.state.challenges.map((challenge, index) => {
            return (
              <Challenge
                key={index}
                name={challenge.name}
                description={challenge.description}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;