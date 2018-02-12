// Core Components
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
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
      searchFieldValue: "",
      menuIsOpen: false,
      colors: []
    };

    this.searchResult = [];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  menuToggle = _ => {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });
  }
  handleChange = e => {
    this.setState({
      searchFieldValue: e.target.value
    });

    card.where({ name: this.state.searchFieldValue })
      .then(result => {
        this.searchResult = result;
      });
    
    console.log(this.searchResult);
  }
  handleSubmit = e => {
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
              value={this.state.searchFieldValue}
              onChange={this.handleChange}
              placeholder="Search..."
              autoFocus="true" />
            {/* <button className="btn search-submit-btn" onClick={this.handleSubmit}>Search</button> */}
          </form>
          <nav className="advanced-search">
            <button className="btn menu-toggle-btn" onClick={_ => this.menuToggle()}>
              Advanced
              <FontAwesome name="menu" />
            </button>
            <ul className={this.state.menuIsOpen ? "menu open" : "menu"}>
              <li className="menu-item">
                <h3 className="menu-item-title">Colors</h3>
                <section className="menu-choice-wrap">
                  <div className="menu-choice">
                    <input type="checkbox" id="colorSettingWhite" />
                    <label htmlFor="colorSettingWhite">White</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox" id="colorSettingBlue" />
                    <label htmlFor="colorSettingBlue">Blue</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox" id="colorSettingBlack" />
                    <label htmlFor="colorSettingBlack">Black</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox" id="colorSettingRed" />
                    <label htmlFor="colorSettingRed">Red</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox" id="colorSettingGreen" />
                    <label htmlFor="colorSettingGreen">Green</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox" id="colorSettingColorless" />
                    <label htmlFor="colorSettingColorless">Colorless</label>
                  </div>
                </section>
              </li>
              <li className="menu-item">
                <h3 className="menu-item-title">Card types</h3>
                <section className="menu-choice-wrap">
                  <div className="menu-choice">
                    <input type="checkbox" id="cardTypeSettingCreature" />
                    <label htmlFor="cardTypeSettingCreature">Creature</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox" id="cardTypeSettingEnchantment" />
                    <label htmlFor="cardTypeSettingEnchantment">Enchantment</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox" id="cardTypeSetting"Sorcery />
                    <label htmlFor="cardTypeSettingSorcery">Sorcery</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox" id="cardTypeSettingInstant" />
                    <label htmlFor="cardTypeSettingInstant">Instant</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox" id="cardTypeSettingArtifact" />
                    <label htmlFor="cardTypeSettingArtifact">Artifact</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox" id="cardTypeSettingLand" />
                    <label htmlFor="cardTypeSettingLand">Land</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox" id="cardTypeSettingPlaneswalker" />
                    <label htmlFor="cardTypeSettingPlaneswalker">Planeswalker</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox" id="cardTypeSettingEmblem" />
                    <label htmlFor="cardTypeSettingEmblem">Emblem</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox" id="cardTypeSettingToken" />
                    <label htmlFor="cardTypeSettingToken">Token</label>
                  </div>
                </section>
              </li>
            </ul>
          </nav>
        </header>
        <main className="app-main">
          {this.state.searchFieldValue == "" &&
            <div className="no-search-yet">Type a card name in the searchbar above</div>
          }
          {this.state.searchFieldValue != "" &&
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