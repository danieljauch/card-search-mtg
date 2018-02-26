// Core Components
import React, { Component } from 'react';     // Docs: https://reactjs.org/docs/
import FontAwesome from 'react-fontawesome';  // Docs: https://github.com/danawoodman/react-fontawesome
import { card } from 'mtgsdk';                // Docs: https://docs.magicthegathering.io/

// Styles
import './css/font-awesome.min.css';          // Docs: https://github.com/danawoodman/react-fontawesome/blob/master/api.md
import './css/keyrune.min.css';               // Docs: https://andrewgioia.github.io/Keyrune/
import './css/mana.min.css';                  // Docs: https://andrewgioia.github.io/Mana/
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
      searchResult: [],
      searchCount: 0,
      queuedSearch: {},
      completedSearches: 0,
      currentResultCount: 0,
      runningResultCount: 0,
      searchInProgress: false,
      resultsPage: 1,
      searchBuffer: 10,
      morePages: false,
      menuIsOpen: false,
      layoutMenuIsOpen: false,
      infoIsOpen: false,
      layout: "list",
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
      },
      "Rarity": {
        type: "Checkboxes",
        list: [ "Common", "Uncommon", "Rare", "Mythic Rare" ]
      }
    };

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleAdvancedSearchChange = this.handleAdvancedSearchChange.bind(this);
  }

  search = () => {
    this.setState({
      searchCount: this.state.searchCount + 1
    });
    
    let searchQuery;
    if (this.state.queuedSearch === {}) {
      searchQuery = {
        name: encodeURIComponent(this.state.searchFieldValue),
        pageSize: encodeURIComponent(this.state.searchBuffer),
        page: encodeURIComponent(this.state.resultsPage)
      };

      if (this.state.colors !== [])
        searchQuery["colors"] = encodeURIComponent(this.state.colors);
        
      if (this.state.cardTypes !== [])
        searchQuery["types"] = encodeURIComponent(this.state.cardTypes);
        
      if (this.state.sets !== [])
        searchQuery["set"] = encodeURIComponent(this.state.sets);
        
      if (this.state.format !== [])
        searchQuery["legalities"] = encodeURIComponent(this.state.format);
    } else
      searchQuery = this.state.queuedSearch;


    if (!this.state.searchInProgress) {
      this.setState({
        searchInProgress: true
      });

      if (this.state.queuedSearch !== {}) {
        this.setState({
          queuedSearch: {}
        });
      }
  
      card.where(searchQuery)
        .then(result => {
          this.setState({
            searchInProgress: false,
            searchResult: result,
            completedSearches: this.state.completedSearches + 1,
            currentResultCount: result.length,
            runningResultCount: this.state.runningResultCount + result.length,
            morePages: this.state.currentResultCount > this.state.pageSize
          });
        });
  
      // check valid results, no errors, backup search from local database

      // console.log("Stats:");
      // console.log("searchQuery:", searchQuery);
      // console.log("searchCount:", this.state.searchCount);
      // console.log("completedSearches:", this.state.completedSearches);
      // console.log("currentResultCount:", this.state.currentResultCount);
      // console.log("runningResultCount:", this.state.runningResultCount);
      // console.log("morePages:", this.state.morePages);
    } else {
      setTimeout(() => {
        this.setState({
          queuedSearch: {
            name: encodeURIComponent(this.state.searchFieldValue),
            colors: encodeURIComponent(this.state.colors),
            types: encodeURIComponent(this.state.cardTypes),
            set: encodeURIComponent(this.state.sets),
            legalities: encodeURIComponent(this.state.format),
            pageSize: encodeURIComponent(this.state.searchBuffer),
            page: encodeURIComponent(this.state.resultsPage)
          }
        });

        this.search();
      }, TICKRATE);
    }
      
    return this.state.searchResult;
  }
  emptySearch = () => {
    return this.state.searchFieldValue === ""
      && this.state.colors === []
      && this.state.cardTypes === []
      && this.state.sets === []
      && this.state.format === [];
  }
  menuToggle = () => {
    this.setState({
      layoutMenuIsOpen: false,
      menuIsOpen: !this.state.menuIsOpen
    });

    return this.state.menuIsOpen;
  }
  layoutToggle = () => {
    this.setState({
      menuIsOpen: false,
      layoutMenuIsOpen: !this.state.layoutMenuIsOpen
    });

    return this.state.layoutMenuIsOpen;
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
  handleLayoutChange = _layout => {
    this.setState({
      layout: _layout
    });
  }

  render() {
    let menuClass = this.state.menuIsOpen ? "menu open" : "menu";
    let layoutClass = this.state.layoutMenuIsOpen ? "layout-select-menu open" : "layout-select-menu";
    let footerClass = this.state.infoIsOpen ? "app-footer open" : "app-footer";
    let appMain = this.emptySearch()
      ? <div className="no-search-yet">Type a card name in the search bar above</div>
      : <section className={`search-result-wrap ${this.state.layout}-layout`}>
          {this.state.searchResult.map(card => (
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
          <div className="layout-select">
            <button className="btn layout-select-btn" onClick={this.layoutToggle}>
              <span>Layout</span>
            </button>
            <section className={layoutClass}>
              <div className="layout-option" onClick={() => this.handleLayoutChange("list")}>
                <FontAwesome name="list" />
                <span>List</span>
              </div>
              <div className="layout-option" onClick={() => this.handleLayoutChange("grid")}>
                <FontAwesome name="th-large" />
                <span>Grid</span>
              </div>
              <div className="layout-option" onClick={() => this.handleLayoutChange("card")}>
                <FontAwesome name="th" />
                <span>Card</span>
              </div>
              <div className="layout-option" onClick={() => this.handleLayoutChange("text")}>
                <FontAwesome name="font" />
                <span>Text</span>
              </div>
            </section>
          </div>
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