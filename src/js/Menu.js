// Core Components
import React, { Component } from 'react';

export default class Menu extends Component {
	constructor (props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = e => {
		this.props.handleChange(e);
		return e;
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
	createList = obj => {
		let listJSX;

		for (let category in obj) {
			listJSX += (
				<li className="menu-item">
					<h3 className="menu-item-title">{category}</h3>
					<section className="menu-choice-wrap">
						{obj[category].type === "Checkboxes" &&
							obj[category].list.map(cat => (
								<div className="menu-choice" key={cat}>
									<input type="checkbox"
										id={`${this.camelCase(category)}Setting_${cat}`}
										onChange={this.handleChange} />
									<label htmlFor={`${this.camelCase(category)}Setting_${cat}`}>{cat}</label>
								</div>
							))
						}
						{obj[category].type === "Search" &&
							<div className="menu-choice">
								<input type="search" id={`${this.camelCase(category)}Setting`} />
							</div>
						}
					</section>
				</li>
			)
		}

		return listJSX;
	}

	render () {
		let { menuClass,
					menu } = this.props;

		return (
			<ul className={menuClass}>
				{this.createList(menu)}
			</ul>
		);
	}
}