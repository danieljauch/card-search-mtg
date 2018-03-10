// Core Components
import React, { Component } from 'react';       // Docs: https://reactjs.org/docs/
import fetch                from 'node-fetch';  // Docs: https://www.npmjs.com/package/node-fetch

// Styles
import './css/font-awesome.min.css'; // Docs: https://fontawesome.com/get-started/web-fonts-with-css
import './css/keyrune.min.css';     // Docs: https://andrewgioia.github.io/Keyrune/
import './css/mana.min.css';        // Docs: https://andrewgioia.github.io/Mana/
import './App.scss';

// Local JS files
import Header from './js/Header';
import Main   from './js/Main';
import Footer from './js/Footer';

const TICKRATE = 250;

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
      displayReady: false,
      menuIsOpen: false,
      infoIsOpen: false,
      searchFieldValue: "",
      colors: [],
      cardTypes: [],
      format: [],
      rarity: [],
      layout: "list"
    };

    this.title = "Cardboard Tutor";
    this.menu = {
      "Colors": {
        type: "Checkboxes",
        list: [ "White", "Blue", "Black", "Red", "Green", "Colorless" ],
        current: ""
      },
      "Card Types": {
        type: "Checkboxes",
        list: [ "Creature", "Enchantment", "Sorcery", "Instant", "Artifact", "Land", "Planeswalker" ],
        current: ""
      },
      "Format": {
        type: "Checkboxes",
        list: [ "Standard", "Modern", "Vintage", "Legacy", "Pauper", "Peasant", "Commander", "Un-Sets" ],
        current: ""
      },
      "Rarity": {
        type: "Checkboxes",
        list: [ "Common", "Uncommon", "Rare", "Mythic Rare" ],
        current: ""
      },
      "Layout": {
        type: "Layout",
        list: [ "List", "Grid", "Card", "Text" ],
        current: ""
      }
    };

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleAdvancedSearchChange = this.handleAdvancedSearchChange.bind(this);
  }

  search = () => {
    this.setState({
      searchCount: this.state.searchCount + 1,
      displayReady: false
    });
    
    let searchQuery;
    if (Object.keys(this.state.queuedSearch).length === 0)
      searchQuery = this.buildSearchString();
    else
      searchQuery = this.state.queuedSearch;


    if (!this.state.searchInProgress) {
      this.setState({
        searchInProgress: true
      });

      if (Object.keys(this.state.queuedSearch).length > 0) {
        this.setState({
          queuedSearch: {}
        });
      }
  
      fetch(`https://api.magicthegathering.io/v1/cards${searchQuery}`)
        .then(r => r.json())
        .then(response => {
          let { cards } = response;

          console.log(cards);
          

          this.setState({
            searchInProgress: false,
            searchResult: cards,
            completedSearches: this.state.completedSearches + 1,
            currentResultCount: cards.length,
            runningResultCount: this.state.runningResultCount + cards.length,
            morePages: this.state.currentResultCount > this.state.pageSize
          });
  
          setTimeout(() => {
            this.setState({
              displayReady: true
            });
          }, TICKRATE);
        }).catch(error => {
          console.error(error);
        });

      // console.log("Stats:");
      // console.log("searchQuery:", searchQuery);
      // console.log("searchCount:", this.state.searchCount);
      // console.log("completedSearches:", this.state.completedSearches);
      // console.log("currentResultCount:", this.state.currentResultCount);
      // console.log("runningResultCount:", this.state.runningResultCount);
      // console.log("morePages:", this.state.morePages);

      return this.state.searchResult;
    } else {
      this.setState({
        queuedSearch: this.buildSearchString()
      });

      setTimeout(this.search, TICKRATE);

      return this.state.queuedSearch;
    }
  }
  buildSearchString = () => {
    let ret = `?name=${this.state.searchFieldValue.trim()}&pageSize=${this.state.searchBuffer}&page=${this.state.resultsPage}`;
    
    if (this.state.colors.length > 0)
      ret += `&colors=${this.state.colors.join("|")}`;

    if (this.state.cardTypes.length > 0)
      ret += `&types=${this.state.cardTypes.join("|")}`;

    if (this.state.format.length > 0)
      ret += `&gameFormat=${this.state.format.join("|")}`;

    if (this.state.rarity.length > 0)
      ret += `&rarity=${this.state.rarity.join("|")}`;

    return ret;
  }
  emptySearch = () => {
    return this.state.displayReady
      && (this.state.searchResult.length === 0
        || (this.state.searchFieldValue === ""
          && this.state.colors === []
          && this.state.cardTypes === []
          && this.state.format === []));
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
    let { propToChange,
          updatedArray } = change;
    
    this.setState({
      [propToChange]: updatedArray
    });

    this.search();
  }
  handleLayoutChange = _layout => {
    this.setState({
      layout: _layout
    });
  }
	resetSettings = () => {
		this.setState({
      colors: [],
      cardTypes: [],
      format: [],
      rarity: [],
      layout: "list"
    });

    for (let item in this.menu) {
      this.menu[item].current = "";
    }
	}

  render() {
    return (
      <div className="app">
        {/* The header holds the title bar, search bar, and settings menu */}
        <Header title={this.title}

          // Search field
          handleSearchValueChange={this.handleSearchValueChange}

					// Menu state
          menu={this.menu}
          menuToggle={this.menuToggle}
          handleAdvancedSearchChange={this.handleAdvancedSearchChange}
          handleLayoutChange={this.handleLayoutChange}
          resetSettings={this.resetSettings}

          // App state
          appState={this.state} />
        
        {/* This is the main render area that includes any search results or a prompt when no search results are present */}
        <Main emptySearch={this.emptySearch()}
          appState={this.state} />

        {/* This is just a space for the info button at the bottom which reveals the credit link */}
        <Footer footerIsOpen={this.state.infoIsOpen}
					infoToggle={this.infoToggle} />
      </div>
    );
  }
}