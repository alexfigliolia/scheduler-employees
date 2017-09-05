import React, { Component } from 'react';
import Login from './components/login/Login';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			height: null,
			loggedIn: false,
			loginClasses: "login",
			loginErrors: "",
      schedules: [],
      currentSkedgeIndex: 0,
      startDay: 8,
      endDay: 7,
      length: 0
		}
	}

	componentDidMount(){
		var self = this,
				h = window.innerHeight;
		self.setState({
			height: h
		});
		window.addEventListener('resize', function(){
			var h = window.innerHeight;
			self.setState({
				height: h
			});
		});
	}

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      schedules: nextProps.schedules,
      currentSkedgeIndex: (nextProps.schedules.length !== this.props.schedules) ? nextProps.schedules.length - 1 : this.props.schedules.length - 1,
      length: nextProps.schedules.length
    });
    if(nextProps.user === null || nextProps.user === undefined) {
      this.setState({
        loggedIn: false
      });
    } else {
      this.setState({
        loggedIn: true
      });
    }
  }

	login(e, p) {
    e = e.toLowerCase();
    Meteor.loginWithPassword(e, p, (err) => {
      this.setState({
        loginClasses: "login login-loading"
      });
      if(err){
        // console.log(err.reason);
        this.setState({
          loginErrors: err.reason,
          loginClasses: "login"
        });
      } else {
        setTimeout(function(){
          this.setState({
            loginErrors: "",
            loginClasses: "login login-loading login-remove"
          });
        }.bind(this), 500);
        setTimeout(function(){
          this.setState({
            loggedIn: true
          });
        }.bind(this), 1800);
      }
    });
  }

  signUp(n, e, p, m) {
    Accounts.createUser({name: n, email: e.toLowerCase(), password: p, managerName: m}, (err) => {
      this.setState({
        loginClasses: "login login-loading"
      });
      if(err){
        // console.log(err.reason);
      } else {
        // console.log('creating new user');
        Meteor.call('group.update', m, e, (error, result) => {
          if(error){console.log(error)} else {
            Meteor.call('user.setGroup', m, m, (error, result) => {
              if(error){console.log(error)} else {
                this.login(e, p);
              }
            });
          }
        });
      }
    });
  }

  navigate(e){
    var dir = e.target.dataset.dir;
    if(dir === "prev") {
      this.setState({
        currentSkedgeIndex: (this.state.currentSkedgeIndex - 1 <= 0) ? 0 : this.state.currentSkedgeIndex - 1
      });
    } else {
      this.setState({
        currentSkedgeIndex: (this.state.currentSkedgeIndex + 1 >= this.state.length) ? this.state.length - 1 : this.state.currentSkedgeIndex + 1
      });
    }
  }

	render(){
		return(
			<div className="App" style={{height: this.state.height}}>

				{
          !this.state.loggedIn &&
          <Login 
            classes={this.state.loginClasses}
            errors={this.state.loginErrors}
            login={this.login.bind(this)}
            signUp={this.signUp.bind(this)} />
        }

        {
        	this.state.loggedIn &&
        	<Header />
        }

        {
          this.state.loggedIn &&
          <Dashboard 
            schedule={this.state.schedules[this.state.currentSkedgeIndex]}
            currentSkedge={this.state.currentSkedgeIndex}
            startDay={this.state.startDay}
            endDay={this.state.endDay} />
        }

			</div>
		);
	}
}