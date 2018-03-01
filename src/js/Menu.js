// Core Components
import React, { Component }	from 'react';
import FontAwesome					from 'react-fontawesome';

// Local JS files
// import MTGSymbol from './MTGSymbol';

export default class Menu extends Component {
	constructor (props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	resetSettings = e => {
		
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
					menu,
					menuToggle,
					handleLayoutChange } = this.props;

		return (
			<nav className="menu-wrap">
				<button className="btn menu-toggle-btn" onClick={menuToggle}>
					<span className="menu-toggle-btn-text">Menu </span>
					<FontAwesome name="cog" className="menu-toggle-btn-icon" />
				</button>
				<div className={menuClass}>
					<ul className="menu-list">
						{Object.keys(menu).map(category => (
							<li className="menu-item" key={category}>
								<h3 className="menu-item-title">{category}</h3>

								{/* Checkbox style */}
								{menu[category].type === "Checkboxes" &&
									<section className="menu-choice-wrap checkbox-menu-choices">
										{menu[category].list.map(cat => (
											<div className="menu-choice" key={cat}>
												<input type="checkbox"
													id={`${this.camelCase(category)}Setting_${cat}`}
													onChange={this.handleChange} />
												<label htmlFor={`${this.camelCase(category)}Setting_${cat}`}>
													{/* <MTGSymbol type="mana" output={cat.toString().toLowerCase()} /> */}
													<span> {cat}</span>
												</label>
											</div>
										))}
									</section>
								}

								{/* Input field style */}
								{menu[category].type === "Search" &&
									<section className="menu-choice-wrap search-menu-choices">
										<div className="menu-choice">
											<input type="search" id={`${this.camelCase(category)}Setting`} />
										</div>
									</section>
								}

								{/* Layout-specific menu layout */}
								{menu[category].type === "Layout" &&
									<section className="menu-choice-wrap checkbox-menu-choices">
										{menu[category].list.map(cat => (
											<div className="menu-choice layout-option" key={cat}>
												<input type="radio"
													id={`${this.camelCase(category)}Setting_${cat}`}
													onChange={() => handleLayoutChange(cat.toString().toLowerCase())} />
												<label htmlFor={`${this.camelCase(category)}Setting_${cat}`}>
													<FontAwesome name={menu[category].icons[menu[category].list.indexOf(cat)]} />
													<span> {cat}</span>
												</label>
											</div>
										))}
									</section>
								}
							</li>
						))}
					</ul>
					<button className="btn clear-advanced-filter-btn" onClick={this.resetSettings}>
						<FontAwesome name="undo" />
						<span> Reset to default</span>
					</button>
				</div>
			</nav>
		);
	}
}