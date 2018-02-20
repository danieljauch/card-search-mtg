// Core Components:
import React, { Component } from 'react';

export default class MTGSymbol extends Component {
	render () {
		let { output, type, rarity } = this.props;
		let fullClassName = type === "keyrune"
			? `ss ss-fw ss-grad ss-${output} ss-${rarity}`
			: `ms ms-cost ms-shadow ms-${output.replace(/\//g, "")}`;

		if (type === "mana" &&
				output.length > 1 &&
				output.substr(output.length - 1) !== "p")
			fullClassName += " ms-split";
		
		return (
			<i className={fullClassName}></i>
		);
	}
}
// Mana:
// Icons: 			https://andrewgioia.github.io/Mana/icons.html
// Attributes:	https://andrewgioia.github.io/Mana/attributes.html
// Cheatsheet:	https://andrewgioia.github.io/Mana/cheatsheet.html

// Keyrune:
// Icons:				https://andrewgioia.github.io/Keyrune/icons.html
// Cheatsheet:	https://andrewgioia.github.io/Keyrune/cheatsheet.html
