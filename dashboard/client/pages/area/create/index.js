Template.areaCreate.onCreated(function() {
    if (FlowRouter.getQueryParam("parent") != "root") {
        this.subscribe("areaById", FlowRouter.getQueryParam("parent"));
    }
});


Template.areaCreate.helpers({
    parent: function() {
        if (FlowRouter.getQueryParam("parent") != "root") {
            return Area.findOne({ _id: FlowRouter.getQueryParam("parent") });
        }
    }
});
Template.areaCreate.events({
    'click #save': function() {

        var areaId = Area.insert({
            parent: FlowRouter.getQueryParam("parent"),
            name: $("#name").val(),
        });

        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "area.insert",
            link: areaId
        });

        toastr.success("地区已添加");

        FlowRouter.go("/area?parent=" + FlowRouter.getQueryParam("parent"));
    },

});

Template.areaCreate.onRendered(function() {

});
