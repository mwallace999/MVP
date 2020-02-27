import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      labels: '',
      voteName: 'Pizza Toppings',
    };
    this.getVote = this.getVote.bind(this);
  }

  componentDidMount() {
    this.getVote();
  }

  parseVotes(array) {
    let votes = [];
    for (const i of array) {
      votes.push(i.vote);
    }
    return votes;
  }

  getVote() {
    axios.get('/getVote', {
      params: {
        voteName: this.state.voteName,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          labels: response.data.data[0].voteOptions,
          data: this.parseVotes(response.data.data),
        }, () => { console.log(this.state.data); });
      })
      .catch((error) => { console.log(error); });
  }

  render() {
    return (
      <>
        <h1>Title</h1>
        <div className="grid-container">
          <div className="grid-userInput">
            <h3>User Input</h3>
          </div>
          <div className="grid-mainChart">
            <h3>Main Chart</h3>
            <Chart
              label="Whatever"
              data={this.state.data}
              labels={this.state.labels}
            />
          </div>
          <div className="grid-chartSelect1">
            <h3>First Past the Post</h3>
            <Chart
              label="First Past the Post"
              data={this.state.data}
              labels={this.state.labels}
            />
          </div>
          <div className="grid-chartSelect2">
            <h3>Single Transferable</h3>
            <Chart
              label="Single Transferable"
              data={this.state.data}
              labels={this.state.labels}
            />
          </div>
        </div>
      </>
    );
  }
}
