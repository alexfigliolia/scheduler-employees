import React, { Component } from 'react';

export default class Footer extends Component {
	render(){
		return(
			<header className="header">
				<div>
					<h1>SKEDGE</h1>
					<button 
						data-view="team"
						onClick={this.props.setView}>
						<svg fill={(this.props.view === 'team') ? "#FFF" : "none"} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
						    <path d="M0 0h24v24H0z" fill="none"/>
						    <path stroke={(this.props.view === 'team') ? "none" : "#FFF"}  d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
						</svg>
					</button>
					<button
						data-view="individual"
						onClick={this.props.setView}>
						<svg fill={(this.props.view === 'individual') ? "#FFF" : "none"} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
						    <path stroke={(this.props.view === 'individual') ? "none" : "#FFF"} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
						    <path d="M0 0h24v24H0z" fill="none"/>
						</svg>
					</button>
				</div>
			</header>
		);
	}
}