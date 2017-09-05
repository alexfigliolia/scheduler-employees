import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { Schedules } from '../api/schedules.js';
import { Employees } from '../api/employees.js';
import { Group } from '../api/group.js';

Accounts.onCreateUser((options, user) => {
  user.name = options.name;
  user.roll = "employee";
  user.managerPassword = options.managerName;
  user.group = "";

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
          "_id": 1,
          "group": 1
       }
     });
  } else {
    return this.ready();
  }
});

Meteor.publish('group', function(){
  var currentUser;
  currentUser = this.userId;
  if (currentUser) {
     return Group.find({
        employees: currentUser
     }
     ,{
       fields: {
          "_id": 1
       }
     });
  } else {
    return this.ready();
  }
});

Meteor.publish('schedules', function() {
  var currentUser;
  currentUser = this.userId;
  var user = Meteor.users.find(currentUser).fetch();
  if(user.length === 0) {
    return this.ready();
  } else {
    var schedules = [ Schedules.find({group: user[0].group}, {
       fields: {
          schedule: 1,
          owner: 1
       }})
    ];
    return schedules;
  } 
});

// Meteor.publish('employees', function(){
// 	var currentUser;
// 	currentUser = this.userId;
// 	var employees = Employees.find({owner: currentUser}, {
// 		fields: {
// 			employee: 1,
//       color: 1,
//       owner: 1
// 		}
// 	});
// 	if(currentUser){
// 		return employees;
// 	} else {
// 		return this.ready();
// 	}
// });

Meteor.methods({

  'group.update'(name, email){
    check(name, String);
    check(email, String);
    return Group.update(
      {name: name},
      {$push: {employees: Meteor.userId(), emails: email}
    });
  },

  'user.setGroup'(accountPassword, ownerName){
    check(accountPassword, String);
    check(ownerName, String);
    var account = Group.find({password: accountPassword, name: ownerName}).fetch();
    if(account.length !== 0) {
      return Meteor.users.update(Meteor.userId(), {
        $set: {
          group: account[0]._id
        }
      });
    }
  },

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