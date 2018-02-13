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
import Card from './js/Card';

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      menuIsOpen: false,
      searchFieldValue: "",
      colors: [],
      cardTypes: []
    };

    this.searchResult = [];

    this.handleChange = this.handleChange.bind(this);
    this.handleAdvancedSearchChange = this.handleAdvancedSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  search = _ => {
    let searchQuery = {
      name: this.state.searchFieldValue
    };

    if (this.state.colors !== []) {
      searchQuery["colors"] = encodeURIComponent(this.state.colors);
    }
    if (this.state.cardTypes !== []) {
      searchQuery["types"] = encodeURIComponent(this.state.cardTypes);
    }

    card.where(searchQuery)
      .then(result => {
        this.searchResult = result;
      });

    // check valid results, no errors, backup search from local database
    
    return this.searchResult;
  }
  menuToggle = _ => {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });

    return this.state.menuIsOpen;
  }
  handleChange = e => {
    this.setState({
      searchFieldValue: e.target.value
    });
    this.search();

    return e.target.value;
  }
  handleAdvancedSearchChange = e => {
    let settingSplit = e.target.id.split("_");
    let tempArray = [];
    let removeIndex;

    if (settingSplit[0] === "colorSetting") {
      tempArray = this.state.colors;

      if (e.target.checked) {
        tempArray.push(settingSplit[1]);
      } else {
        removeIndex = tempArray.indexOf(settingSplit[1]);
        tempArray.splice(removeIndex, 1);
      }

      this.setState({
        colors: tempArray
      });
    } else if (settingSplit[0] === "cardTypeSetting") {
      tempArray = this.state.cardTypes;

      if (e.target.checked) {
        tempArray.push(settingSplit[1]);
      } else {
        removeIndex = tempArray.indexOf(settingSplit[1]);
        tempArray.splice(removeIndex, 1);
      }

      this.setState({
        cardTypes: tempArray
      });
    }

    this.search();
  }
  handleSubmit = e => {
    e.preventDefault();
  }

  render() {
    let appMain = this.state.searchFieldValue === "" && this.state.colors === [] && this.state.cardTypes === []
        ? <div className="no-search-yet">Type a card name in the searchbar above</div>
        : <section className="search-result-wrap">
            {this.searchResult.map(card => (
              <Card key={`card-${card.id}`}
                card={card} />
            ))}
          </section>

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
            <button className="btn menu-toggle-btn" onClick={this.menuToggle}>
              Advanced
              <FontAwesome name="menu" />
            </button>
            <ul className={this.state.menuIsOpen ? "menu open" : "menu"}>
              <li className="menu-item">
                <h3 className="menu-item-title">Colors</h3>
                <section className="menu-choice-wrap">
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="colorSetting_White"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="colorSetting_White">White</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="colorSetting_Blue"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="colorSetting_Blue">Blue</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="colorSetting_Black"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="colorSetting_Black">Black</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="colorSetting_Red"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="colorSetting_Red">Red</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="colorSetting_Green"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="colorSetting_Green">Green</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="colorSetting_Colorless"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="colorSetting_Colorless">Colorless</label>
                  </div>
                </section>
              </li>
              <li className="menu-item">
                <h3 className="menu-item-title">Card types</h3>
                <section className="menu-choice-wrap">
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="cardTypeSetting_Creature"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="cardTypeSetting_Creature">Creature</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="cardTypeSetting_Enchantment"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="cardTypeSetting_Enchantment">Enchantment</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="cardTypeSetting_Sorcery"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="cardTypeSetting_Sorcery">Sorcery</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="cardTypeSetting_Instant"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="cardTypeSetting_Instant">Instant</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="cardTypeSetting_Artifact"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="cardTypeSetting_Artifact">Artifact</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="cardTypeSetting_Land"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="cardTypeSetting_Land">Land</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="cardTypeSetting_Planeswalker"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="cardTypeSetting_Planeswalker">Planeswalker</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="cardTypeSetting_Emblem"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="cardTypeSetting_Emblem">Emblem</label>
                  </div>
                  <div className="menu-choice">
                    <input type="checkbox"
                      id="cardTypeSetting_Token"
                      onChange={this.handleAdvancedSearchChange} />
                    <label htmlFor="cardTypeSetting_Token">Token</label>
                  </div>
                </section>
              </li>
            </ul>
          </nav>
        </header>
        <main className="app-main">
          {appMain}
        </main>
      </div>
    );
  }
}