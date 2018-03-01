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
					menuToggle,
					handleAdvancedSearchChange,
					handleLayoutChange,
					appState } = this.props;
		
		let { menuIsOpen,
					colors,
					cardTypes,
					sets,
					format,
					layout } = appState;

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
					menuToggle={menuToggle}
					handleLayoutChange={handleLayoutChange} />
			</header>
		);
	}
}