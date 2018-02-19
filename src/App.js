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
import Search from './js/Search';
import Menu from './js/Menu';
import Card from './js/Card';

const TICKRATE = 100;

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchInProgress: false,
      menuIsOpen: false,
      infoIsOpen: false,
      layout: "list", // "list" | "grid" | "card" | "text"
      searchFieldValue: "",
      colors: [],
      cardTypes: [],
      sets: [],
      format: []
    };

    this.menu = {
      "Colors": {
        type: "Checkboxes",
        list: [ "White", "Blue", "Black", "Red", "Green", "Colorless" ]
      },
      "Card Types": {
        type: "Checkboxes",
        list: [ "Creature", "Enchantment", "Sorcery", "Instant", "Artifact", "Land", "Planeswalker", "Emblem", "Token" ]
      },
      "Set": {
        type: "Search",
        list: [] // Dynamically built from search?
      },
      "Format": {
        type: "Checkboxes",
        list: [ "Standard", "Modern", "Vintage", "Legacy", "Pauper", "Peasant", "Commander", "Conspiracy", "Silver-border" ]
      }
    };

    this.queuedSearch = {};
    this.searchResult = [];
    // this.searchQuery = {
    //   name: encodeURIComponent(this.state.searchFieldValue),
    //   colors: encodeURIComponent(this.state.colors),
    //   types: encodeURIComponent(this.state.cardTypes),
    //   set: encodeURIComponent(this.state.sets),
    //   legalities: encodeURIComponent(this.state.format)
    // }

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleAdvancedSearchChange = this.handleAdvancedSearchChange.bind(this);
  }

  search = () => {
    let searchQuery = this.queuedSearch === {}
      ? { name: this.state.searchFieldValue }
      : this.queuedSearch;

    if (this.state.colors !== []) {
      searchQuery["colors"] = encodeURIComponent(this.state.colors);
    }
    if (this.state.cardTypes !== []) {
      searchQuery["types"] = encodeURIComponent(this.state.cardTypes);
    }

    if (!this.state.searchInProgress) {
      this.setState({
        searchInProgress: true
      });

      if (this.queuedSearch !== {})
        this.queuedSearch = {};
  
      card.where(searchQuery)
        .then(result => {
          this.setState({
            searchInProgress: false
          });
          this.searchResult = result;
        });
  
      // check valid results, no errors, backup search from local database
    } else {
      setTimeout(() => {
        this.queuedSearch = { name: this.state.searchFieldValue };
        this.search();
      }, TICKRATE);
    }
      
    return this.searchResult;
  }
  menuToggle = () => {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    });

    return this.state.menuIsOpen;
  }
  infoToggle = () => {
    this.setState({
      infoIsOpen: !this.state.infoIsOpen
    });

    return this.state.infoIsOpen;
  }
  handleSearchValueChange = searchValue => {
    this.setState({
      searchFieldValue: searchValue
    });
    this.search();

    return searchValue;
  }
  handleAdvancedSearchChange = change => {
    this.setState({
      [change.propToChange]: change.updatedArray
    })

    this.search();
  }

  render() {
    let menuClass = this.state.menuIsOpen ? "menu open" : "menu";
    let footerClass = this.state.infoIsOpen ? "app-footer open" : "app-footer";
    let emptySearch = this.state.searchFieldValue === ""
      && this.state.colors === []
      && this.state.cardTypes === [];
    let appMain = emptySearch
      ? <div className="no-search-yet">Type a card name in the search bar above</div>
      : <section className={`search-result-wrap ${this.state.layout}-layout`}>
          {this.searchResult.map(card => (
            <Card key={`card-${card.id}`}
              card={card} />
          ))}
        </section>;

    return (
      <div className="app">
        <header className="app-header">
          <h1 className="header-title">MTG Card Search</h1>
          <Search handleChange={this.handleSearchValueChange} />
          <nav className="advanced-search">
            <button className="btn menu-toggle-btn" onClick={this.menuToggle}>
              <span>Advanced</span>
              <FontAwesome name="menu" />
            </button>
            <Menu menuClass={menuClass}
              menu={this.menu}
              handleChange={this.handleAdvancedSearchChange}
              colors={this.state.colors}
              cardTypes={this.state.cardTypes}
              sets={this.state.sets}
              format={this.state.format} />
          </nav>
        </header>
        <main className="app-main">
          {appMain}
        </main>
        <footer className={footerClass}>
          <button className="btn info-btn circle-btn" onClick={this.infoToggle}>
            <FontAwesome name="info" />
          </button>
          <article className="information">
            <p>Created by <a href="https://danieljauch.bitbucket.io/">Daniel Jauch</a></p>
          </article>
        </footer>
      </div>
    );
  }
}