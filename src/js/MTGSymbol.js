// Core Components:
import React, { Component } from 'react';

export default class MTGSymbol extends Component {
	render () {
		let { output, type, rarity } = this.props;
		let fullClassName;
		
		if (type === "keyrune") {
			fullClassName = `ss ss-fw ss-grad ss-${output} ss-${rarity}`;
		} else if (type === "mana") {
			fullClassName = "ms ms-cost ms-shadow";

			if (output === "t")
				fullClassName += " ms-tap";
			else
				fullClassName += ` ms-${output.replace(/\//g, "")}`;

			if (output.length > 1 &&
					output.substr(output.length - 1) !== "p")
				fullClassName += " ms-split";
		} else
			console.log("Invalid symbol type:", type);
		
		return <i className={fullClassName}></i>;
	}
}
// Mana:
// Icons: 			https://andrewgioia.github.io/Mana/icons.html
// Attributes:	https://andrewgioia.github.io/Mana/attributes.html
// Cheatsheet:	https://andrewgioia.github.io/Mana/cheatsheet.html

// Keyrune:
// Icons:				https://andrewgioia.github.io/Keyrune/icons.html
// Cheatsheet:	https://andrewgioia.github.io/Keyrune/cheatsheet.html
