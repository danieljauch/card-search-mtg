// Core Components
import React, { Component } from 'react';
import { card } from 'mtgsdk';

// Styles
import './css/font-awesome.min.css';  // Docs: https://github.com/danawoodman/react-fontawesome/blob/master/api.md
import './css/keyrune.min.css';       // Docs: https://andrewgioia.github.io/Keyrune/
import './css/mana.min.css';          // Docs: https://andrewgioia.github.io/Mana/
import './App.scss';

// Local JS files
import Card from './js/Card.js';

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchValue: ""
    };

    this.searchResult = [];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      searchValue: e.target.value
    });

    card.where({ name: this.state.searchValue })
      .then(result => {
        this.searchResult = result;
      });

    console.log("Search complete:");
    console.log(this.searchResult);
  }

  handleSubmit = e => {
    console.log("A search was submitted: " + this.state.searchValue);
    e.preventDefault();
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="header-title">MTG Card Search</h1>
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input type="search"
              className="search-input"
              id="searchInput" 
              alue={this.state.searchValue}
              onChange={this.handleChange}
              placeholder="Search..."
              autoFocus="true" />
            {/* <button className="btn search-submit-btn" onClick={this.handleSubmit}>Search</button> */}
          </form>
        </header>
        <main className="app-main">
          {this.state.searchValue == "" &&
            <div className="no-search-yet">Type a card name in the searchbar above</div>
          }
          {this.state.searchValue != "" &&
            <section className="search-result-wrap">
              {this.searchResult.map(card => (
                <Card key={"card-" + card.id} card={card} />
              ))}
            </section>
          }
        </main>
      </div>
    );
  }
}