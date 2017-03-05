
Meteor.startup(function(){Menus.insert({parent:"root",router:"contact",name:"联系人管理",roles:["admin"]})});
Meteor.startup(function(){Menus.insert({parent:"root",router:"supplier",name:"供应商管理",roles:["admin"]})});
Meteor.startup(function(){Menus.insert({parent:"root",router:"category",name:"分类管理",roles:["admin"]})});
Meteor.startup(function(){Menus.insert({parent:"root",router:"area",name:"地区管理",roles:["admin"]})});
Meteor.startup(function(){Menus.insert({parent:"root",router:"goods",name:"物资管理",roles:["admin"]})});
Meteor.startup(function(){Menus.insert({parent:"root",router:"depot",name:"库房管理",roles:["admin"]})});
// Meteor.startup(function(){Menus.insert({parent:"root",router:"movebound",name:"移库管理",roles:["admin"]})});
Meteor.startup(function(){Menus.insert({parent:"root",router:"outbound",name:"出库管理",roles:["admin"]})});
Meteor.startup(function(){Menus.insert({parent:"root",router:"inbound",name:"入库管理",roles:["admin"]})});