import { Meteor } from 'meteor/meteor';
import { Schedules } from '../api/schedules.js';
import { Employees } from '../api/employees.js';
import { createContainer } from 'meteor/react-meteor-data';
import App from './App.js';

export default AppContainer = createContainer(() => {
  const users = Meteor.subscribe('userData');
  const id = Meteor.userId();
  const user = Meteor.user();
  const userSchedules = Meteor.subscribe('schedules');
  const schedulesReady = userSchedules.ready();
  const schedules = Schedules.find({}, {sort: {'schedule.for': 1}}).fetch();
  const schedulesExist = schedulesReady && !!schedules;
  return {
    id,
    user,
    schedulesReady,
    userSchedules,
    schedulesExist,
    schedules,
  };
}, App);