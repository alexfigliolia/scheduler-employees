import React, { Component } from 'react';

export default class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			newUser: false,
			loginErrors: "Error:",
			receivedInfo: false
		}
		this.info = [];
	}

	focus = (e) => {
		e.target.parentNode.classList.add('focused');
	}

	blur = (e) => {
		if(e.target.value === "") {
			e.target.parentNode.classList.remove('focused');
		}
	}

	isNewUser = () => {
		this.setState({
			newUser: !this.state.newUser
		});
	}

	signIn = () => {
		let name, email, password;
		const ereg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(this.refs.email.value !== "" && 
			 ereg.test(this.refs.email.value) && 
			 this.refs.password !== "") 
		{
			email = this.refs.email.value;
			password = this.refs.password.value;
			this.props.login(email, password);
			this.setState({
				loginErrors: "Error:"
			});
		} else {
			this.setState({
				loginErrors: "Error: Please check your inputs and try again"
			});
		}
	}

	aquireInfo = () => {
		let name, email, password;
		const ereg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(this.refs.name.value !== "" && 
			 this.refs.email.value !== "" && 
			 ereg.test(this.refs.email.value) && 
			 this.refs.password !== "") 
		{
			name = this.refs.name.value;
			email = this.refs.email.value;
			password = this.refs.password.value;
			this.info[0] = name;
			this.info[1] = email;
			this.info[2] = password;
			this.setState({
				receivedInfo: true
			});
		} else {
			this.setState({
				loginErrors: "Error: Please check your inputs and try again"
			});
		}
	}

	signUp = () => {
		let name, managerName, email, password;
		const ereg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(this.refs.managerName.value !== "") {
			name = this.info[0];
			email = this.info[1];
			password = this.info[2];
			managerName = this.refs.managerName.value;
			this.props.signUp(name, email, password, managerName);
			this.setState({
				loginErrors: "Error:"
			});
			this.info = [];
		} else {
			this.setState({
				loginErrors: "Error: Please check your inputs and try again"
			});
		}
	}

	render(){
		return(
			<section className={this.props.classes}>
				<div>
					{
						(this.state.newUser) ?
							<h1>
								<span>S</span>
								<span>i</span>
								<span>g</span>
								<span>n</span> 
								<span>U</span>
								<span>p</span>
							</h1>
						:
							<h1>
								<span>L</span>
								<span>o</span>
								<span>g</span>
								<span>i</span>
								<span>n</span>
							</h1>
					}
					{
						(this.state.loginErrors !== "Error:" || this.props.errors !== "") ?
						<h2>{(this.state.loginErrors !== "Error:") ? this.state.loginErrors : this.props.errors}</h2> : ""
					}
					<div>
						{
							(this.state.newUser && !this.state.receivedInfo)?
							<div>
								<input 
									onBlur={this.blur}
									onFocus={this.focus} 
									type="text" 
									id="name"
									ref="name" />
								<label htmlFor="name">Full Name</label>
							</div>
							: ""
						}
						{
							(this.state.newUser && this.state.receivedInfo)?
							<div>
								<input 
									onBlur={this.blur}
									onFocus={this.focus} 
									type="text" 
									id="managerName"
									ref="managerName" />
								<label htmlFor="managerName">Manager Name</label>
							</div>
							: ""
						}
						{
							(!this.state.receivedInfo)?
							<div>
								<input 
									onBlur={this.blur}
									onFocus={this.focus} 
									type="email" 
									id="username"
									ref="email" />
								<label htmlFor="username">Email</label>
							</div>
							: ""
						}
						{
							(!this.state.receivedInfo)?
								<div>
									<input 
										onBlur={this.blur}
										onFocus={this.focus} 
										type="password" 
										id="password"
										ref="password" />
									<label htmlFor="password">Password</label>
								</div>
							: ""
						}
						<button 
							onClick={(!this.state.newUser && !this.state.receivedInfo) ? 
												this.signIn : 
												(this.state.newUser && !this.state.receivedInfo) ? 
												this.aquireInfo : this.signUp}>
								Login
								<img src="check.svg" alt="logging in" />
						</button>
						{
							!this.state.newUser &&
							<h2>Are you a new user? <a onClick={this.isNewUser}>Sign up</a></h2>
						}
						{
							this.state.newUser &&
							<h2>Already have an accout? <a 
																						data-login="true"
																						onClick={this.isNewUser}>Login</a></h2>
						}
					</div>
				</div>
			</section>
		);
	}
}