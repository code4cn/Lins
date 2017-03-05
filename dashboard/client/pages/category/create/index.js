Template.categoryCreate.onCreated(function() {
    if (FlowRouter.getQueryParam("parent") != "root") {
        this.subscribe("categoryById", FlowRouter.getQueryParam("parent"));
    }
});


Template.categoryCreate.helpers({
    parent: function() {
        if (FlowRouter.getQueryParam("parent") != "root") {
            return Category.findOne({ _id: FlowRouter.getQueryParam("parent") });
        }
    },
    types:function(){
        return _category.type;
    }
});
Template.categoryCreate.events({
    'click #save': function() {

        var type = $("#type").val();

        if (FlowRouter.getQueryParam("parent") != "root") {
           var parentObj = Category.findOne({ _id: FlowRouter.getQueryParam("parent") });
           type = parentObj.type
        }

        var categoryId = Category.insert({
            parent: FlowRouter.getQueryParam("parent"),
            name: $("#name").val(),
            type: type,
        });

        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "category.insert",
            link: categoryId
        });

        toastr.success("分类已添加");

        FlowRouter.go("/category?parent=" + FlowRouter.getQueryParam("parent"));
    },

});

Template.categoryCreate.onRendered(function() {

});
