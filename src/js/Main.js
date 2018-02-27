// Core Components
import React, { Component } from 'react';

// Local JS files
import Card from './Card';

export default class Main extends Component {
	render () {
		let { emptySearch,
					layout,
					searchResult,
					displayReady } = this.props;
		
		return (
			<main className="app-main">
				{emptySearch &&
					<div className="no-search-yet">Type a card name in the search bar above</div>
				}
				{!emptySearch &&
					<section className={`search-result-wrap ${layout}-layout`}>
						{searchResult.map(card => (
							<Card key={`card-${card.id}`}
								card={card}
								displayReady={displayReady} />
						))}
					</section>
				}
			</main>
		);
	}
}