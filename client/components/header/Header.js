import React, { Component } from 'react';

export default class Footer extends Component {
	render(){
		return(
			<header className="header">
				<div>
					<button 
						onClick={this.props.revealSettings}
						className={this.props.classes}>
						<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
					    <path d="M0 0h24v24H0z" fill="none"/>
					    <path stroke="#fff" d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
						</svg>
						<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
							<path stroke="#fff" d="M25.172 54.828l-20-20c-1.562-1.562-1.562-4.095 0-5.657l20-20c1.562-1.562 4.095-1.562 5.657 0s1.562 4.095 0 5.657l-13.172 13.172h38.343c2.209 0 4 1.791 4 4s-1.791 4-4 4h-38.343l13.172 13.172c0.781 0.781 1.172 1.805 1.172 2.828s-0.39 2.047-1.172 2.828c-1.562 1.562-4.095 1.562-5.657 0z" fill="#fff"></path>
						</svg>
					</button>
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