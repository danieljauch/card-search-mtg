// Core Components
import React, { Component }	from 'react';
import FontAwesome					from 'react-fontawesome';

export default class Footer extends Component {
	render () {
		let { footerIsOpen,
					infoToggle } = this.props;
		
		let footerClass = footerIsOpen ? "app-footer open" : "app-footer";
		
		return <footer className={footerClass}>
				<button className="btn info-btn circle-btn" onClick={infoToggle}>
					<FontAwesome name="info" />
				</button>
				<article className="information">
					<p>Created by <a href="https://danieljauch.bitbucket.io/">Daniel Jauch</a></p>
				</article>
			</footer>
	}
}