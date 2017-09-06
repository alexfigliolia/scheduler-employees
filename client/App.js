import React, { Component } from 'react';
import Login from './components/login/Login';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
      user: null,
			height: null,
			loggedIn: false,
			loginClasses: "login",
			loginErrors: "",
      schedules: [],
      currentSkedgeIndex: 0,
      startDay: 8,
      endDay: 7,
      length: 0,
      view: "individual"
		}
    this.loader = document.getElementById('appLoader');
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
    if(this.props !== nextProps){
      console.log(nextProps);
      if(nextProps.user === null || nextProps.user === undefined) {
        if(this.loader !== null) {
          this.loader.remove();
        }
        this.setState({
          loggedIn: false
        });
      } else {
        this.consumeDB(nextProps);
        if(this.loader !== null) {
          setTimeout(function(){
            this.loader.classList.add('app-loader-hidden');
          }.bind(this), 2000);
          setTimeout(function(){
            this.loader.remove();
          }.bind(this), 2600);
        }
      }
    }
  }

  consumeDB(path){
    this.setState({
      schedules: path.schedules,
      currentSkedgeIndex: (path.schedules.length !== this.state.schedules) ? path.schedules.length - 1 : this.state.schedules.length - 1,
      length: path.schedules.length,
      user: path.user
    });
    setTimeout(function(){
      this.setState({
        loggedIn: true,
      });
    }.bind(this), 1800);
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

  setView(e){
    var view = (e.target.tagName === "BUTTON") ? 
                e.target.dataset.view : 
                (e.target.tagName === "path") ? 
                e.target.parentNode.parentNode.dataset.view : 
                e.target.parentNode.dataset.view;
    this.setState({
      view: view
    });
  }

  navigate(e){
    var dir = e.target.dataset.dir;
    if(dir === "prev"){
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
        	<Header 
            setView={this.setView.bind(this)}
            view={this.state.view} />
        }

        {
          this.state.loggedIn &&
          <Dashboard 
            schedule={this.state.schedules[this.state.currentSkedgeIndex]}
            currentSkedge={this.state.currentSkedgeIndex}
            length={this.state.length}
            startDay={this.state.startDay}
            endDay={this.state.endDay}
            view={this.state.view}
            user={this.state.user}
            navigate={this.navigate.bind(this)} />
        }

			</div>
		);
	}
}