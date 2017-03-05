Template.depotCreate.onCreated(function() {
    this.subscribe("depotBase");
});


Template.depotCreate.helpers({
    categorys: function(pid) {
        return Category.find({parent:pid});
    },
    areas:function(pid){
        return Area.find({parent:pid});
    },
    admins: function(pid) {
        return Meteor.users.find({}, { sort: { "profile.name": 1 } });
    },
});
Template.depotCreate.events({
    'click #save': function() {

        var depotId = Depot.insert({
            name: $("#name").val(),
            tel: $("#tel").val(),
            category: $("#category").val(),
            area: $("#area").val(),
            address: $("#address").val(),
            admin: $("#admin").val(),
            remark: $("#remark").val(),
            createdAt:new Date(),
            updatedAt:new Date(),
            status:true,
            op:Meteor.userId(),
        });

        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "depot.insert",
            link: depotId
        });

        toastr.success("库房已添加");

        FlowRouter.go("/depot");
    },

});

Template.depotCreate.onRendered(function() {

});
