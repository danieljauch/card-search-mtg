// Core Components:
import React, { Component } from 'react';

export default class Keyrune extends Component {
	_fullClassName (properties) {
		let fullClassName = "ss";
		
		if (properties.hasOwnProperty("name"))
			fullClassName += ` ss-${properties.name}`;
	
		if (properties.hasOwnProperty("size") &&
				properties.size > 1)
			fullClassName += ` ss-${properties.size}x`;
		
		if (properties.hasOwnProperty("fixedWidth") &&
				properties.fixedWidth)
			fullClassName += " ss-fw";
	
		if (properties.hasOwnProperty("rarity"))
			fullClassName += ` ss-${properties.rarity}`;
		
		if (properties.hasOwnProperty("grad") &&
				properties.grad)
			fullClassName += " ss-grad";
	
		if (properties.hasOwnProperty("foil") &&
				properties.foil)
			fullClassName += " ss-foil";
		
		return fullClassName;
	}

	render () {
		return (
			<i className={this._fullClassName(this.props)}></i>
		);
	}
}

// Icons:				https://andrewgioia.github.io/Keyrune/icons.html
// Cheatsheet:	https://andrewgioia.github.io/Keyrune/cheatsheet.html
