import React, { Component } from 'react';

export default class Settings extends Component {
	render(){
		return(
			<div className={this.props.classes}>
				<div>
					<button onClick={this.props.logout}>Log Out</button>
				</div>
			</div>
		);
	}
}