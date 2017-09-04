import React, { Component} from 'react';

export default class Dashboard extends Component{
	constructor(props){
		super(props);
		this.state = {
			hours: [],
			shiftClasses: "shift"
		}
		this.week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	}

	componentDidMount(){
		setTimeout(function(){
			this.setState({
				shiftClasses: "shift shift-show"
			});
		}.bind(this), 500);
		this.createHours(this.props.startDay, this.props.endDay);
	}

	componentWillReceiveProps(nextProps){
		this.createHours(this.props.startDay, this.props.endDay);
	}

	calcDif(start, end){
		var hours = []
		var stop = end + 13;
		for(var i = start; i<stop; i++) {
			hours.push(i);
		}
		return (hours[hours.length - 1] - hours[0] >= 12) ? (hours[hours.length - 1] - hours[0]) - 12 : hours[hours.length - 1] - hours[0] ;
	}

	createHours(start, end){
		var hours = []
		var stop = end + 12;
		for(var i = start; i<stop; i++) {
			hours.push(i);
		}
		this.setState({
			hours: hours
		});
	}

	render(){
		const forDate = (this.props.schedule !== undefined) ? new Date(this.props.schedule.schedule[0].for) : false;
		const mondays = this.state.mondays;
		return(
			<div className="dashboard">
				<div>
					<div className="dates">
						<div>
							<button></button>
							{(!forDate) ? "Ass!!!" : "Monday " + this.months[forDate.getMonth()] + " " + forDate.getDate() + " - " + this.months[new Date(forDate.getTime() + 6 * 24 * 60 * 60 * 1000).getMonth()] + " " + new Date(forDate.getTime() + 6 * 24 * 60 * 60 * 1000).getDate()}
							<button></button>
						</div>
					</div>
					<div className="individual-view">
						<div>
							<div className="weekdays">
								{
									this.week.map((day, i) => {
										return(
											<div 
												key={i}
												data-sm={day.substring(0, 3)}
												data-lg={day}></div>
										);
									})
								}
							</div>
							<div className='individual-shifts'>
								{
									this.props.schedule !== undefined &&
									this.props.schedule.schedule.map((weekday, i) => {
										if(i > 0) {
											return(
												<div key={i}>
													{
														weekday.map((shift, j) => {
															if(shift.employee === "Alex"){
																return(
																	<div 
																		className={this.state.shiftClasses}
																		key={j}
																		style={{
																		  left: this.calcDif(this.props.startDay, parseInt(shift.times.on.substring( 0, shift.times.on.length-2 ))) * (100 / this.state.hours.length) + "%",
																			width: this.calcDif(parseInt(shift.times.on.substring( 0, shift.times.on.length-2 )), parseInt(shift.times.off.substring( 0, shift.times.on.length-2 ))) * (100 / this.state.hours.length) + "%",
																			borderRadius: "100px",
																			background: shift.color,
																			transitionDelay: (j/10) + "s"
																		}}>
																			<p>{shift.times.on + " - " + shift.times.off}</p>
																	</div>
																);
															}
														})
													}
												</div>
											);
										}
									})
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}