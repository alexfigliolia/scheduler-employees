import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { Schedules } from '../api/schedules.js';
import { Employees } from '../api/employees.js';

Accounts.onCreateUser((options, user) => {
  user.name = options.name;
  user.roll = "employee";
  user.managerPassword = options.name;
  user.employees = [];

  return user;
});

Meteor.publish('userData', function() {
  var currentUser;
  currentUser = this.userId;
  if (currentUser) {
     return Meteor.users.find({
        _id: currentUser
     }
     ,{
       fields: {
          "name" : 1,
          "roll" : 1,
          "_id": 1
       }
     });
  } else {
    return this.ready();
  }
});

Meteor.publish('schedules', function(){
	var currentUser;
	currentUser = this.userId;
	var schedules = Schedules.find({owner: currentUser}, {
		fields: {
			schedule: 1,
			owner: 1
		}
	});
	if(currentUser) {
		return schedules;
	} else {
		return this.ready();
	}
});

Meteor.publish('employees', function(){
	var currentUser;
	currentUser = this.userId;
	var employees = Employees.find({owner: currentUser}, {
		fields: {
			employee: 1,
      color: 1,
      owner: 1
		}
	});
	if(currentUser){
		return employees;
	} else {
		return this.ready();
	}
});

Meteor.methods({

  // 'schedules.add'(schedule){
  // 	check(schedule, Array);
  // 	return Schedules.insert({owner: Meteor.userId(), schedule: schedule});
  // },

  // 'schedules.remove'(date){
  //   check(date, Date);
  //   return Schedules.remove({owner: Meteor.userId(), 'schedule.for': date});
  // },

  // 'shift.add'(shift, day, date){
  //   check(shift, Object);
  //   check(day, Number);
  //   check(date, Date);
  //   return Schedules.update(
  //     {owner: Meteor.userId(), 'schedule.for': date},
  //     {$push:{['schedule.' + day]: shift}
  //   });
  // },

  // 'shift.edit'(on, off, day, index, date){
  //   check(on, String);
  //   check(off, String);
  //   check(day, Number);
  //   check(index, Number);
  //   check(date, Date);
  //   return Schedules.update(
  //     {owner: Meteor.userId(), 'schedule.for': date},
  //     {$set: 
  //       {
  //         ['schedule.' + day + '.' + index + '.times.on']: on,
  //         ['schedule.' + day + '.' + index + '.times.off']: off
  //       }
  //   });
  // },

  // 'shift.remove'(day, index, name, date){
  //   check(day, Number);
  //   check(index, Number);
  //   check(name, String);
  //   check(date, Date);
  //   return Schedules.update(
  //     {owner: Meteor.userId(), 'schedule.for': date},
  //     {$pull: { ['schedule.' + day]: {employee: name} }
  //   });
  // },

  // 'employee.add'(employee, color){
  //   check(employee, String);
  //   check(color, String);
  //   return Employees.insert({employee: employee, color: color, owner: Meteor.userId()});
  // },

  // 'employee.updateName'(id, name, oldName){
  //   check(id, String);
  //   check(name, String);
  //   check(oldName, String);
  //   Employees.update(
  //     {_id: id},
  //     {$set: {employee: name}
  //   });
  //   var schedules = Schedules.find({owner: Meteor.userId()}).fetch();
  //   for(var i = 0; i < schedules.length; i++){
  //     var s = schedules[i].schedule;
  //     for(var j = 0; j < s.length; j++) {
  //       if(j > 0) {
  //         for(var k = 0; k < s[j].length; k++){
  //           if(s[j][k].employee === oldName){
  //             Schedules.update(
  //               {owner: Meteor.userId(), 'schedule.for': s[0].for},
  //               {$set: 
  //                 {
  //                   ['schedule.' + j + '.' + k + '.employee']: name
  //                 }
  //             });
  //           }
  //         }
  //       }
  //     }
  //   }
  // },

  // 'employee.updateColor'(id, color, name){
  //   check(id, String);
  //   check(color, String);
  //   Employees.update(
  //     {_id: id},
  //     {$set: {color: color}
  //   });
  //   var schedules = Schedules.find({owner: Meteor.userId()}).fetch();
  //   for(var i = 0; i < schedules.length; i++){
  //     var s = schedules[i].schedule;
  //     for(var j = 0; j < s.length; j++) {
  //       if(j > 0) {
  //         for(var k = 0; k < s[j].length; k++){
  //           if(s[j][k].employee === name){
  //             Schedules.update(
  //               {owner: Meteor.userId(), 'schedule.for': s[0].for},
  //               {$set: 
  //                 {
  //                   ['schedule.' + j + '.' + k + '.color']: color
  //                 }
  //             });
  //           }
  //         }
  //       }
  //     }
  //   }
  // },

  sendEmail(message) {
    check(message, Object);
    Meteor.defer(() => {
      Email.send({
        to: message.to,
        from: Meteor.user().name + " " + Meteor.user().emails[0].address,
        subject: Meteor.user().emails[0].address + " " + 'sent a message!',
        text: message.message,
      });
    });
  }

});

if(Meteor.isCordova) {
  StatusBar.hide();
}