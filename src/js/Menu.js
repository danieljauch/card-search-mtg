// Core Components
import React, { Component } from 'react';

export default class Menu extends Component {
	constructor (props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = e => {
		let targetID = e.target.id.split("Setting_");
		let isChecked = e.target.checked;
    let tempArray = this.props[targetID[0]];
		let removeIndex;

		if (isChecked)
			tempArray.push(targetID[1]);
		else {
			removeIndex = tempArray.indexOf(targetID[1]);
			tempArray.splice(removeIndex, 1);
		}
		
		this.props.handleChange({
			propToChange: targetID[0],
			updatedArray: tempArray
		})
		
		return {
			propToChange: targetID[0],
			updatedArray: tempArray
		};
	}
	camelCase = str => {
		let stringWords = str.split(" ");
		let outputString = "";

		for (let word = 0, l = stringWords.length; word < l; word++) {
			if (word === 0)
				outputString += stringWords[word].toString().toLowerCase();
			else
				outputString += stringWords[word].toString().charAt(0).toUpperCase() + stringWords[word].toString().slice(1).toLowerCase();
		}

		return outputString;
	}

	render () {
		let { menuClass,
					menu } = this.props;

		return (
			<ul className={menuClass}>
				{Object.keys(menu).map(category => (
					<li className="menu-item" key={category}>
						<h3 className="menu-item-title">{category}</h3>
						{menu[category].type === "Checkboxes" &&
							<section className="menu-choice-wrap checkbox-menu-choices">
								{menu[category].list.map(cat => (
									<div className="menu-choice" key={cat}>
										<input type="checkbox"
											id={`${this.camelCase(category)}Setting_${cat}`}
											onChange={this.handleChange} />
										<label htmlFor={`${this.camelCase(category)}Setting_${cat}`}>{cat}</label>
									</div>
								))}
							</section>
						}
						{menu[category].type === "Search" &&
							<section className="menu-choice-wrap search-menu-choices">
								<div className="menu-choice">
									<input type="search" id={`${this.camelCase(category)}Setting`} />
								</div>
							</section>
						}
					</li>
				))}
			</ul>
		);
	}
}