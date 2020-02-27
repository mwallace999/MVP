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

  test() {
    console.log('Yah, you clicked a button!');
  }

  fptpAlg(data) {
    const fptpObj = {};
    for (let i = 1; i <= this.state.labels.length; i++) {
      fptpObj[i] = 0;
    }
    for (let j = 0; j < data.length; j++) {
      fptpObj[data[j][0]] += 1;
    }
    return Object.values(fptpObj);
  };


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

  seedVote() {
    
  }

  render() {
    return (
      <>
        <h1>Title</h1>
        <div className="grid-container">
          <div className="grid-userInput">
            <h3>User Input</h3>
            <button type="button" onClick={this.test}>Db Seeder</button>
          </div>
          <div className="grid-mainChart">
            <h3>Main Chart</h3>
            <Chart
              // label="First Past the Post"
              data={this.fptpAlg(this.state.data)}
              labels={this.state.labels}
              backgroundColor="rgb(46, 134, 193)"
              borderColor="rgb(21, 67, 96)"
            />
          </div>
          <div className="grid-chartSelect1">
            <h3>First Past the Post</h3>
            <Chart
              // label="First Past the Post"
              data={this.fptpAlg(this.state.data)}
              labels={this.state.labels}
              backgroundColor="rgb(46, 134, 193)"
              borderColor="rgb(21, 67, 96)"
            />
          </div>
          <div className="grid-chartSelect2">
            <h3>Ranked Choice</h3>
            <Chart
              // label="First Past the Post"
              data={this.fptpAlg(this.state.data)}
              labels={this.state.labels}
              backgroundColor="rgb(46, 134, 193)"
              borderColor="rgb(21, 67, 96)"
            />
          </div>
        </div>
      </>
    );
  }
}
