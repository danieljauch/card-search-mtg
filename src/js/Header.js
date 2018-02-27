// Core Components
import React, { Component }	from 'react';
import FontAwesome					from 'react-fontawesome';

// Local JS files
import Search	from './Search';
import Menu		from './Menu';

export default class Header extends Component {
	render () {
		let { title,

					// Search field
					handleSearchValueChange,

					// Menu state
					menu,
					menuIsOpen,
					menuToggle,
					handleAdvancedSearchChange,

					// Menu options
					colors,
					cardTypes,
					sets,
					format,
					layout } = this.props;

		let menuClass = menuIsOpen ? "menu open" : "menu";
		
		return (
			<header className="app-header">
				<h1 className="header-title">{title}</h1>

				<Search handleChange={handleSearchValueChange} />

				<Menu menuClass={menuClass}
					menu={menu}
					handleChange={handleAdvancedSearchChange}
					colors={colors}
					cardTypes={cardTypes}
					sets={sets}
					format={format}
					menuToggle={menuToggle} />
			</header>
		);
	}
}