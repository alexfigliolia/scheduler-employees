import React, { Component } from 'react';

export default class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			newUser: false,
			loginErrors: "Error:"
		}
	}

	focus(e) {
		e.target.parentNode.classList.add('focused');
	}

	blur(e) {
		if(e.target.value === "") {
			e.target.parentNode.classList.remove('focused');
		}
	}

	isNewUser(){
		this.setState({
			newUser: !this.state.newUser
		});
	}

	signIn(){
		var name, email, password, ereg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!this.state.newUser) {
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
		} else {
			if(this.refs.name.value !== "" && 
				 this.refs.email.value !== "" && 
				 ereg.test(this.refs.email.value) && 
				 this.refs.password !== "") 
			{
				name = this.refs.name.value;
				email = this.refs.email.value;
				password = this.refs.password.value;
				this.props.signUp(name, email, password);
				this.setState({
					loginErrors: "Error:"
				});
			} else {
				this.setState({
					loginErrors: "Error: Please check your inputs and try again"
				});
			}
		}
	}

	render(){
		return(
			<section className={this.props.classes}>
				<div>
					<h1>
						<span>L</span>
						<span>o</span>
						<span>g</span>
						<span>i</span>
						<span>n</span>
					</h1>
					{
						(this.state.loginErrors !== "Error:" || this.props.errors !== "") ?
						<h2>{(this.state.loginErrors !== "Error:") ? this.state.loginErrors : this.props.errors}</h2> : ""
					}
					<div>
						{
							this.state.newUser &&
							<div>
								<input 
									onBlur={this.blur.bind(this)}
									onFocus={this.focus.bind(this)} 
									type="text" 
									id="name"
									ref="name" />
								<label htmlFor="name">Full Name</label>
							</div>
						}
						<div>
							<input 
								onBlur={this.blur.bind(this)}
								onFocus={this.focus.bind(this)} 
								type="email" 
								id="username"
								ref="email" />
							<label htmlFor="username">Email</label>
						</div>
						<div>
							<input 
								onBlur={this.blur.bind(this)}
								onFocus={this.focus.bind(this)} 
								type="password" 
								id="password"
								ref="password" />
							<label htmlFor="password">Password</label>
						</div>
						<button onClick={this.signIn.bind(this)}>Login</button>
						{
							!this.state.newUser &&
							<h2>Are you a new user? <a onClick={this.isNewUser.bind(this)}>Sign up</a></h2>
						}
						{
							this.state.newUser &&
							<h2>Already have an accout? <a onClick={this.isNewUser.bind(this)}>Login</a></h2>
						}
					</div>
				</div>
			</section>
		);
	}
}