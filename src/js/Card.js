// Core Components
import React, { Component } from 'react';

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
	cardText = text => text.split("\n")

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
				<div className="card-img-wrap">
					<img className="card-img" src={card.imageUrl} alt={card.name} />
				</div>
				<figcaption className="card-info">
					<header className="card-header-row">
						<h3>{card.name}</h3>
						<h4>{card.type}</h4>
						{typeof(card.manaCost) !== "undefined" &&
							<span className="card-info-mana-cost">
								{this.cardManaCost(card.manaCost).map((manaShortcode, index) => (
									<MTGSymbol output={manaShortcode}
										type="mana"
										key={index} />
								))}
							</span>
						}
					</header>
					<div className="card-info-row">
						<p className="card-info-text">{card.text}</p>
					</div>
					<div className="card-info-row">
					</div>
					<footer className="card-info-row">
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