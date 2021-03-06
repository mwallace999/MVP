import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      // for charts
      data: '',
      labels: '',
      // for seeding
      voteName: 'Pizza Toppings',
      choiceArr: ['onions', 'peppers', 'mushrooms', 'olives', 'pepperoni', 'pineapple', 'sausage'],
      maxChoice: 5,
      quantity: 10,
      // for user interface
      dropDown: [],
    };
    this.getVote = this.getVote.bind(this);
    this.seedVote = this.seedVote.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.dropDownChange = this.dropDownChange.bind(this);
  }

  componentDidMount() {
    this.getCategories();
    this.getVote();
  }

  parseVotes(array) {
    let votes = [];
    for (const i of array) {
      votes.push(i.vote);
    }
    return votes;
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
  }

  getCategories() {
    axios.get('/getCategories')
      .then((response) => {
        console.log(response.data.data.unshift(''));
        this.setState({
          dropDown: response.data.data,
        }, () => { console.log(this.state.dropDown); });
      })
      .catch((error) => { console.log(error); });
  }

  dropDownChange(thing) {
    // console.log(document.getElementById('dropDown'));
    // if (document.getElementById('dropDown') != null && document.getElementById('dropDown').value !== '') {
    //   this.setState({
    //     voteName: document.getElementById('dropDown').value,
    //   }, () => { if (this.state.voteName !== []) this.getVote(); });
    // }
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

  seedVote() {
    axios.get('/seedVote', {
      params: {
        voteName: this.state.voteName,
        choiceArr: this.state.choiceArr,
        maxChoice: this.state.maxChoice,
        quantity: this.state.quantity,
      },
    })
      .then((response) => {
        console.log(response);
        this.getVote();
      })
      //console.log(response.data.data);
      // this.setState({
      //   labels: response.data.data[0].voteOptions,
      //   data: this.parseVotes(response.data.data),
      // }, () => { console.log(this.state.data); })
      .catch((error) => { console.log(error); });
  }

  render() {
    return (
      <>
        <h1 className="titleTop">VoteSm@rt</h1>
        <div className="grid-container">
          <div className="grid-userInput">
            <div className="dropDownName">
              <table>
                <tbody>
                  <tr>
                    <td><h3>Vote</h3></td>
                    <td>
                      <select id="dropDown" onChange={this.dropDownChange()} style={{width: '200px'}}>
                      {this.state.dropDown.map((choice, index) => <option value={choice} key={index}>{choice}</option>)}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><h3 className="title">Title</h3></td>
                    <td><input type="text" style={{width: '200px'}} name="title" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <form>
              <div>
                <table className="newVoteTable">
                <tbody>
                  <tr>
                    <th>Choice</th>
                    <th>Vote</th>
                  </tr>
                  <tr>
                    <td><input className="input" type="text" name="choice1" required /></td>
                    <td><input type="number" /></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="choice2" required /></td>
                    <td><input type="number" /></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="choice3" /></td>
                    <td><input type="number" /></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="choice4" /></td>
                    <td><input type="number" /></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="choice5" /></td>
                    <td><input type="number" /></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="choice6" /></td>
                    <td><input type="number" /></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="choice7" /></td>
                    <td><input type="number" /></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="choice8" /></td>
                    <td><input type="number" /></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td><button type="submit">Vote</button></td>
                  </tr>
                </tbody>
                </table>
              </div>
            </form>
            <h3>Create a new Vote</h3>
            <button type="button">Create</button>
            <button type="button">Submit</button><br />
            <h3>Seed</h3>
            <button type="button" onClick={this.seedVote}>Seed</button>
            <input type="number" /><br />

          </div>
          <div className="grid-mainChart">
            <h3>Main Chart</h3>
            <Chart
              // label="First Past the Post"
              data={this.fptpAlg(this.state.data)}
              labels={this.state.labels}
              backgroundColor="rgb(102, 0, 0)"
              borderColor="rgb(21, 67, 96)"
            />
          </div>
          <div className="grid-chartSelect1">
            <h3>First Past the Post</h3>
            <Chart
              // label="First Past the Post"
              data={this.fptpAlg(this.state.data)}
              labels={this.state.labels}
              backgroundColor="rgb(102, 0, 0)"
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
