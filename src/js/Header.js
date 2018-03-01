// Core Components
import React, { Component }	from 'react';

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

		let menuClass = appState.menuIsOpen ? "menu open" : "menu";
		
		return <header className="app-header">
				<h1 className="header-title">{title}</h1>

				<Search handleChange={handleSearchValueChange} />

				<Menu menuClass={menuClass}
					menu={menu}
					menuToggle={menuToggle}
					handleChange={handleAdvancedSearchChange}
					handleLayoutChange={handleLayoutChange}
					appState={appState} />
			</header>
	}
}