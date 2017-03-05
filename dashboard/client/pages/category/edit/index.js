Template.categoryEdit.onCreated(function() {
    this.subscribe("categoryById", FlowRouter.getQueryParam("id"));
});


Template.categoryEdit.helpers({
    parent: function() {
        return Category.findOne({ _id: FlowRouter.getQueryParam("id") });
    },
    types: function() {
        return _category.type;
    },
    checkStatus: function() {
        var category = Category.findOne({ _id: FlowRouter.getQueryParam("id") });

        if (category) {
            return this.key == category.type ? "selected" : ""
        }
    }
});
Template.categoryEdit.events({
    'click #save': function() {

        var category = Category.findOne({ _id: FlowRouter.getQueryParam("id") })



        Category.update({ _id: FlowRouter.getQueryParam("id") }, {
            $set: {
                name: $("#name").val(),
            }
        });



        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "category.update",
            link: FlowRouter.getQueryParam("id")
        });

        toastr.success("分类已更新");

        FlowRouter.go("/category?parent=" + category.parent);
    },

});

Template.categoryEdit.onRendered(function() {

});
