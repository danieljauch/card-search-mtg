// Core Components
import React, { Component, Fragment } from 'react';

// Local JS files
import MTGSymbol from './MTGSymbol';

export default class Card extends Component {
	cardManaCost = manaCost => {
		if (manaCost !== "") {
			let splitValues = manaCost.split("{");
			let finalOutput = [];

			for (let i = 1, l = splitValues.length; i < l; i++) {
				finalOutput.push(splitValues[i].split("}")[0].toString().toLowerCase());
			}

			return finalOutput;
		} else
			return manaCost;
	}
	cardNumber = num => {
		if (num < 10)
			return "00" + num;
		if (num < 100)
			return "0" + num;

		return num;
	}
	cardText = (name, text) => {
		let paragraphs = text.split("\n");
		let currentParagraph;
		let editedParagraph = [];
		let output = [];
		let symbolStartPos = 0;
		let beforeSymbol = "";
		
		for (let i = 0, l = paragraphs.length; i < l; i++) {
			if (paragraphs[i].indexOf("{") > -1) {
				// cost symbol present
				editedParagraph = [];
				currentParagraph = paragraphs[i].split("}");
				
				// find the symbol, convert it
				for (let j = 0, k = currentParagraph.length; j < k; j++) {
					symbolStartPos = currentParagraph[j].indexOf("{");
					
					if (symbolStartPos === -1) {
						editedParagraph.push(currentParagraph[j]);
					} else if (symbolStartPos === 0) {
						editedParagraph.push((
							<MTGSymbol output={currentParagraph[j].substring(1).toLowerCase()} type="mana" />
						));
					} else {
						beforeSymbol = currentParagraph[j].substring(0, symbolStartPos);

						if (beforeSymbol !== "")
							editedParagraph.push(beforeSymbol);
						
						editedParagraph.push((
							<MTGSymbol output={currentParagraph[j].substring(symbolStartPos + 1).toLowerCase()} type="mana" />
						));
					}
				}

				// add the finished paragraph in JSX, including the symbols
				output.push((
					<Fragment>
						{editedParagraph.map((currentParagraph, index) => (
							<span key={`paragraph_${name}_${index}`}>{currentParagraph}</span>
						))}
					</Fragment>
				));
			} else {
				output.push((
					<Fragment>{paragraphs[i]}</Fragment>
				));
			}
		}

		return output;
	}

	render () {
		let { card,
					displayReady } = this.props;
		
		let colorIdentity;
		let cardClass = "card-wrap";

		if (typeof(card.colorIdentity) !== "undefined") {
			if (card.colorIdentity.length === 1)
				colorIdentity = card.colorIdentity.join("");
			else
				colorIdentity = "M";
		} else
			colorIdentity = "C";
		
		cardClass += ` color-identity-${colorIdentity}`;

		if (displayReady)
			cardClass += " display";
		
		return (
			<figure className={cardClass}>
				{/* Image */}
				<div className="card-img-wrap">
					<img className="card-img" src={card.imageUrl} alt={card.name} />
				</div>

				{/* Information */}
				<figcaption className="card-info">
					{/* Header: name, type, mana cost */}
					<header className="card-header-row">
						<h3>{card.name}</h3>
						<h4>{card.type}</h4>
						{typeof(card.manaCost) !== "undefined" &&
							<span className="card-info-mana-cost">
								{this.cardManaCost(card.manaCost).map((manaShortcode, index) => (
										<MTGSymbol output={manaShortcode}
											type="mana"
											key={`symbol_${card.name}_${index}`} />
									))}
							</span>
						}
					</header>

					{/* Card text */}
					<div className="card-info-row">
						{this.cardText(card.name, card.text).map((currentText, index) => (
							<p className="card-info-text" key={`cardText_${card.name}_${index}`}>{currentText}</p>
						))}
					</div>

					{/* Flavor text */}
					{typeof(card.flavor) !== "undefined" &&
						<div className="card-info-row">
							{card.flavor.split("\n").map((currentText, index) => (
								<p className="card-info-flavor-text" key={`flavorText_${card.name}_${index}`}>{currentText}</p>
							))}
						</div>
					}

					{/* Footer: power / toughness, set, collector number */}
					<footer className="card-footer-row">
						{typeof(card.power) !== "undefined" && typeof(card.toughness) !== "undefined" &&
							<p className="card-info-power-toughness">{`[${card.power}/${card.toughness}]`}</p>
						}
						<h5 className="card-info-set-number">
							<span className="card-info-set-symbol">
								<MTGSymbol output={card.set.toString().toLowerCase()}
									type="keyrune"
									rarity={card.rarity.toString().toLowerCase()} />
							</span>
							<span className="card-info-set-text">({card.set} &middot; {this.cardNumber(card.number)})</span>
						</h5>
					</footer>
				</figcaption>
			</figure>
		);
	}
}