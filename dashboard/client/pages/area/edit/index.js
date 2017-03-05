Template.areaEdit.onCreated(function() {
    this.subscribe("areaById", FlowRouter.getQueryParam("id"));
});


Template.areaEdit.helpers({
    parent: function() {
        return Area.findOne({ _id: FlowRouter.getQueryParam("id") });
    }
});
Template.areaEdit.events({
    'click #save': function() {

        var area = Area.findOne({ _id: FlowRouter.getQueryParam("id") })

        Area.update({_id:FlowRouter.getQueryParam("id")},{
            $set:{
                name: $("#name").val(),
            }
        });

        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "area.update",
            link: FlowRouter.getQueryParam("id")
        });

        toastr.success("地区已更新");

        FlowRouter.go("/area?parent=" + area.parent);
    },

});

Template.areaEdit.onRendered(function() {

});
