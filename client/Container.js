import { Meteor } from 'meteor/meteor';
import { Schedules } from '../api/schedules.js';
import { Employees } from '../api/employees.js';
import { createContainer } from 'meteor/react-meteor-data';
import App from './App.js';

export default AppContainer = createContainer(() => {
  const users = Meteor.subscribe('userData');
  const id = Meteor.userId();
  const userSchedules = Meteor.subscribe('schedules');
  const userEmployees = Meteor.subscribe('employees');
  const schedulesReady = userSchedules.ready();
  const employeesReady = userEmployees.ready();
  const schedules = Schedules.find({owner: id}, {sort: {'schedule.for': 1}}).fetch();
  const employees = Employees.find({owner: id}).fetch();
  const schedulesExist = schedulesReady && !!schedules;
  const employeesExist = employeesReady && !!employees;
  return {
    id,
    schedulesReady,
    employeesReady,
    userSchedules,
    userEmployees,
    schedulesExist,
    employeesExist,
    schedules,
    employees
  };
}, App);