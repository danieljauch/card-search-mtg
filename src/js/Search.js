// Core Components
import React, { Component } from 'react';

export default class Search extends Component {
	constructor (props) {
		super(props);

		this.state = {
			value: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
	}

	handleChange = e => {
		let { value } = e.target;

		this.setState({
			value: value
		});

		this.props.handleChange(value);

		return value;
	}
	handleSearchSubmit = e => {
		e.preventDefault();
	}

	render () {
		return (
			<form className="search-form" onSubmit={this.handleSearchSubmit}>
				<input type="search"
					className="search-input"
					id="searchInput"
					value={this.state.value}
					onChange={this.handleChange}
					placeholder="Type a card name..."
					autoFocus="true" />
			</form>
		);
	}
}