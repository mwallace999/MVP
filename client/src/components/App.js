import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [0, 10, 5, 2, 20, 30, 45, 50, 30, 5],
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      startDate: '2019-01-01', //YYYY-MM-DD
      endDate: '2019-03-01', //YYYY-MM-DD
      timeSpan: 'Day',
      //coin: 'something',
    };
    this.getCoin = this.getCoin.bind(this);
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
    this.getCoin();
  }

  getCoin() {
    axios.get('/getCoin', {
      params: {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      },
    })
      .then((response) => {
        this.setState({ data: Object.values(response.data) }, () => { console.log(response.data); });
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
