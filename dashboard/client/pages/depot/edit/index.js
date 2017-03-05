Template.depotEdit.onCreated(function() {
    this.subscribe("depotBase");
    this.subscribe("depotById", FlowRouter.getQueryParam("id"));
});


Template.depotEdit.helpers({
    depot: function() {
        return Depot.findOne({ _id: FlowRouter.getQueryParam("id") });
    },
    categorys: function(pid) {
        return Category.find({parent:pid});
    },
    areas: function(pid) {
        return Area.find({ parent: pid });
    },
    admins: function(pid) {
        return Meteor.users.find({}, { sort: { "profile.name": 1 } });
    },
    checkStatus: function(str1, str2) {
        return str1 == str2 ? "selected" : "";
    }
});
Template.depotEdit.events({
    'click #save': function() {

        var depot = Depot.findOne({ _id: FlowRouter.getQueryParam("id") })



        Depot.update({ _id: FlowRouter.getQueryParam("id") }, {
            $set: {
                name: $("#name").val(),
                tel: $("#tel").val(),
                category: $("#category").val(),
                address: $("#address").val(),
                area: $("#area").val(),
                admin: $("#admin").val(),
                remark: $("#remark").val(),
                updatedAt: new Date(),
                op: Meteor.userId(),
            }
        });



        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "depot.update",
            link: FlowRouter.getQueryParam("id")
        });

        toastr.success("库房信息已更新");

        FlowRouter.go("/depot");
    },

});

Template.depotEdit.onRendered(function() {

});
