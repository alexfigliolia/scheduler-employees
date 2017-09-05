import React, { Component} from 'react';
import Flickity from 'flickity';

export default class Dashboard extends Component{
	constructor(props){
		super(props);
		this.state = {
			hours: [],
			shiftClasses: "shift",
			schedule: []
		}
		this.week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	}

	componentDidMount(){
		const carousel = document.getElementById('carousel');
    const options = {
        cellSelector: '.team-day',
        contain: true,
        initialIndex: 0,
        setGallerySize: false,
        cellAlign: "center"
    }
    this.flkty = new Flickity(carousel, options);
    this.flkty.on('cellSelect', this.updateSelected);
    console.log(this.flkty);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.schedule !== this.state.schedule){
			this.createHours(this.props.startDay, this.props.endDay);
			this.setState({
				schedule: nextProps.schedule,
				shiftClasses: "shift shift-show"
			});
		}
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
		const forDate = (this.state.schedule.schedule !== undefined) ? new Date(this.state.schedule.schedule[0].for) : false;
		const mondays = this.state.mondays;
		return(
			<div className="dashboard">
				<div>
					<div className="dates">
						<div>
							<button 
								onClick={this.props.navigate}
								data-dir="prev"></button>
							{(!forDate) ? "Date unavailable" : "Monday " + this.months[forDate.getMonth()] + " " + forDate.getDate() + " - " + this.months[new Date(forDate.getTime() + 6 * 24 * 60 * 60 * 1000).getMonth()] + " " + new Date(forDate.getTime() + 6 * 24 * 60 * 60 * 1000).getDate()}
							<button 
								onClick={this.props.navigate}
								data-dir="next"></button>
						</div>
					</div>
					<div className={(this.props.view === "individual") ? "individual-view individual-view-show" : "individual-view"}>
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
									this.state.schedule.schedule !== undefined &&
									this.state.schedule.schedule.map((weekday, i) => {
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
																			background: shift.color,
																			transition: "transform 0.3s " + (0.5 + i/10) + "s, boxShadow 0.3s " + (0.8 + i/10) + "s"
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
					<div className={(this.props.view === "team") ? "team-view team-view-show" : "team-view"}>
						<div>
							<div 
								id="carousel" 
								className="team-days">
								{
									this.props.schedule.schedule !== undefined &&
									this.props.schedule.schedule.map((day, i) => {
										if(i > 0) {
											console.log(day);
											return(
												<div
													className="team-day" 
													key={i}
													data-sm={this.week[i - 1].substring(0, 3)}
													data-lg={this.week[i - 1]}>
													<h2>{this.week[i - 1]}</h2>
													<div className="bar-container">
														{
															day.map((shift, j) => {
																return (
																	<div 
																		className="team-shift"
																		key={j}
																		style={{
																			background: shift.color,
																			top: this.calcDif(this.props.startDay, parseInt(shift.times.on.substring( 0, shift.times.on.length-2 ))) * (100 / this.state.hours.length) + "%",
																			height: this.calcDif(parseInt(shift.times.on.substring( 0, shift.times.on.length-2 )), parseInt(shift.times.off.substring( 0, shift.times.on.length-2 ))) * (100 / this.state.hours.length) + "%",
																			width: 80 / day.length + "%",
																			left: ((80 / day.length) * j) + 10 + "%"
																		}}>
																		<p>{shift.times.on}</p>
																		<p>{shift.employee}</p>
																		<p>{shift.times.off}</p>
																	</div>
																);
															})
														}
													</div>
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