// Core Components
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

// Local JS files
import Search from './Search';
import Menu from './Menu';

export default class Header extends Component {
	render () {
		let { title,

					// Search field
					handleSearchValueChange,

					// Advanced menu
					menu,
					menuIsOpen,
					menuToggle,
					handleAdvancedSearchChange,
					colors,
					cardTypes,
					sets,
					format,

					// Layout menu
					layoutMenuIsOpen,
					layoutToggle,
					handleLayoutChange } = this.props;

		let menuClass = menuIsOpen ? "menu open" : "menu";
		let layoutClass = layoutMenuIsOpen ? "layout-select-menu open" : "layout-select-menu";
		
		return (
			<header className="app-header">
				<h1 className="header-title">{title}</h1>
				<Search handleChange={handleSearchValueChange} />

				{/* <nav className="settings-menu">
					<button className="btn menu-toggle-btn" onClick={menuToggle}>
						<span>Menu</span>
						<FontAwesome name="cogs" />
					</button>
				</nav> */}

				<nav className="advanced-search">
					<button className="btn menu-toggle-btn" onClick={menuToggle}>
						<span>Advanced</span>
						<FontAwesome name="cog" />
					</button>
					<Menu menuClass={menuClass}
						menu={menu}
						handleChange={handleAdvancedSearchChange}
						colors={colors}
						cardTypes={cardTypes}
						sets={sets}
						format={format} />
				</nav>

				<div className="layout-select">
					<button className="btn layout-select-btn" onClick={layoutToggle}>
						<span>Layout</span>
					</button>
					<section className={layoutClass}>
						<div className="layout-option" onClick={() => handleLayoutChange("list")}>
							<FontAwesome name="list" />
							<span>List</span>
						</div>
						<div className="layout-option" onClick={() => handleLayoutChange("grid")}>
							<FontAwesome name="th-large" />
							<span>Grid</span>
						</div>
						<div className="layout-option" onClick={() => handleLayoutChange("card")}>
							<FontAwesome name="th" />
							<span>Card</span>
						</div>
						<div className="layout-option" onClick={() => handleLayoutChange("text")}>
							<FontAwesome name="font" />
							<span>Text</span>
						</div>
					</section>
				</div>
			</header>
		);
	}
}