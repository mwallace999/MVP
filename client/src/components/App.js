import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [10, 5, 2, 20, 30, 45, 50, 30],
      labels: ['Choice1', 'Choice2', 'Choice3', 'Choice4', 'Choice5', 'Choice6', 'Choice7', 'Choice8'],
      vote: 'pizzaToppings',
    };
    this.getVote = this.getVote.bind(this);
  }

  // const data = {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [{
  //     label: "My First dataset",
  //     backgroundColor: 'rgb(255, 99, 132)',
  //     borderColor: 'rgb(255, 99, 132)',
  //     data: [0, 10, 5, 2, 20, 30, 45],
  //   }]
  // }

  componentDidMount() {
    this.getVote();
  }

  getVote() {
    axios.get('/getVote', {
      params: {
        vote: this.state.vote,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        //this.setState({ data: Object.values(response.data) }, () => { console.log(response.data); });
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
              data={this.state.data}
              labels={this.state.labels}
              timeSpan={this.state.timeSpan}
            />
          </div>
          <div className="grid-chartSelect1">
            <h3>Method1</h3>
            <Chart
              data={this.state.data}
              labels={this.state.labels}
              timeSpan={this.state.timeSpan}
            />
          </div>
          <div className="grid-chartSelect2">
            <h3>Method2</h3>
            <Chart
              data={this.state.data}
              labels={this.state.labels}
              timeSpan={this.state.timeSpan}
            />
          </div>
        </div>
      </>
    );
  }
}
