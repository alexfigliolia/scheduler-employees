import React, { Component } from 'react';
import Login from './components/login/Login';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import Settings from './components/settings/Settings';

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
      user: null,
			height: null,
			loggedIn: false,
			loginClasses: "login",
      settingsClasses: "settings",
      gearClasses: "gear",
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
		var h = window.innerHeight;
		this.setState({
			height: h
		});
		window.addEventListener('resize', () => {
			var h = window.innerHeight;
			this.setState({
				height: h
			});
		});
	}

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps){
      console.log(nextProps);
      if(nextProps.user === null) {
        this.hideLoader();
        this.setState({
          loggedIn: false
        });
      } else {
        if(Meteor.user().roll === "employer") {
          this.setState({
            loginErrors: "This app is for your employees! Please sign into the manager's app.",
            loginClasses: "login",
            loggedIn: false
          });
          if(this.loader !== null) {
            this.hideLoader();
          }
        } else {
          this.consumeDB(nextProps);
        }
      }
    }
  }

  consumeDB = (path) => {
    this.hideLoader();
    setTimeout(() => {
      this.setState({
        loggedIn: true
      });
    }, 1250);
    setTimeout(() => {
      this.setState({
        schedules: path.schedules,
        currentSkedgeIndex: (path.schedules.length !== this.state.schedules) ? (path.schedules.length - 1 < 0) ? 0 : path.schedules.length - 1 : this.state.schedules.length - 1,
        length: path.schedules.length,
        user: path.user
      });
    }, 1300);
  }

  hideLoader(){
    if(this.loader !== null) {
      setTimeout(() => {
        this.loader.classList.add('app-loader-hidden');
      }, 1000);
      setTimeout(() => {
        this.loader.remove();
      }, 1600);
    }
  }

	login = (e, p) => {
    const email = e.toLowerCase();
    Meteor.loginWithPassword(email, p, (err) => {
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
        if(Meteor.user().roll !== "employee") {
          this.setState({
            loginErrors: "This app is for your employees! Please sign into the manager's app.",
            loginClasses: "login",
            loggedIn: false
          });
        } else {
          setTimeout(() => {
            this.setState({
              loginErrors: "",
              loginClasses: "login login-loading login-remove"
            });
          }, 250);
        }
      }
    });
  }

  signUp = (n, e, p, m) => {
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

  logout = () => {
    Meteor.logout();
    this.revealSettings();
    this.setState({
      loginClasses: "login"
    });
  }

  setView = (e) => {
    let view = (e.target.tagName === "BUTTON") ? 
                e.target.dataset.view : 
                (e.target.tagName === "path") ? 
                e.target.parentNode.parentNode.dataset.view : 
                e.target.parentNode.dataset.view;
    this.setState({
      view: view
    });
  }

  navigate = (e) => {
    const dir = e.target.dataset.dir;
    if(dir === "prev"){
      this.setState({
        currentSkedgeIndex: (this.state.currentSkedgeIndex - 1 <= 0) ? 0 : this.state.currentSkedgeIndex - 1
      });
    } else {
      this.setState({
        currentSkedgeIndex: (this.state.currentSkedgeIndex + 1 >= this.state.length) ? (this.state.length - 1 < 0) ? 0 : this.state.length - 1 : this.state.currentSkedgeIndex + 1
      });
    }
  }

  revealSettings = () => {
    this.setState((prevState, props) => {
      return {
        settingsClasses: (prevState.settingsClasses === "settings" ? 
                          "settings settings-show" : "settings"),
        gearClasses: (prevState.gearClasses === "gear") ?
                      "gear gear-hide" : "gear"
      };
    });
  }

	render = () => {
		return(
			<div className="App" style={{height: this.state.height}}>

				{
          !this.state.loggedIn &&
          <Login 
            classes={this.state.loginClasses}
            errors={this.state.loginErrors}
            login={this.login}
            signUp={this.signUp} />
        }

        {
        	this.state.loggedIn &&
        	<Header 
            setView={this.setView}
            view={this.state.view}
            revealSettings={this.revealSettings}
            classes={this.state.gearClasses} />
        }

        {
          this.state.loggedIn &&
          <Dashboard 
            schedule={this.props.schedules[this.state.currentSkedgeIndex]}
            currentSkedge={this.state.currentSkedgeIndex}
            length={this.state.length}
            startDay={this.state.startDay}
            endDay={this.state.endDay}
            view={this.state.view}
            user={this.state.user}
            navigate={this.navigate} />
        }

        {
          this.state.loggedIn &&
          <Settings 
            classes={this.state.settingsClasses}
            logout={this.logout} />
        }

			</div>
		);
	}
}