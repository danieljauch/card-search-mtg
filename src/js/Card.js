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
		
		for (let i = 0, l = paragraphs.length; i < l; i++) {
			if (paragraphs[i].indexOf("{") > -1) {
				// cost symbol present
				currentParagraph = paragraphs[i].split("}");
				for (let j = 0, k = currentParagraph.length; j < k; j++) {
					if (currentParagraph[j].charAt(0) === "{") {
						// replace with MTGSymbol
						editedParagraph.push((
							<MTGSymbol output={currentParagraph[j].substring(1).toLowerCase()} type="mana" />
						));
					} else
						editedParagraph.push(currentParagraph[j]);
				}
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
	flavorText = text => text.split("\n")

	render () {
		let { card } = this.props;
		let colorIdentity;

		if (typeof(card.colorIdentity) !== "undefined") {
			if (card.colorIdentity.length === 1)
				colorIdentity = card.colorIdentity.join("");
			else
				colorIdentity = "M";
		} else
			colorIdentity = "C";
		
		return (
			<figure className={`card-wrap color-identity-${colorIdentity}`}>
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
							{this.flavorText(card.flavor).map((currentText, index) => (
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