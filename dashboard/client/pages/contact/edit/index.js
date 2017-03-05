Template.contactEdit.onCreated(function() {
    this.subscribe("contactBase");
    this.subscribe("contactById", FlowRouter.getQueryParam("id"));
});


Template.contactEdit.helpers({
    contact: function() {
        return Contact.findOne({ _id: FlowRouter.getQueryParam("id") });
    },
    categorys: function(pid) {
        return Category.find({parent:pid});
    },
    areas:function(pid){
        return Area.find({parent:pid});
    },
    checkStatus: function(str1,str2) {
        return str1 == str2 ? "selected" : "";
    }
});
Template.contactEdit.events({
    'click #save': function() {

        var contact = Contact.findOne({ _id: FlowRouter.getQueryParam("id") })



        Contact.update({ _id: FlowRouter.getQueryParam("id") }, {
            $set: {
                name: $("#name").val(),
                nick: $("#nick").val(),
                tel: $("#tel").val(),
                sex: $("#sex").val(),
                category: $("#category").val(),
                area: $("#area").val(),
                channel: $("#channel").val(),
                title: $("#title").val(),
                company: $("#company").val(),
                remark: $("#remark").val(),
                updatedAt:new Date(),
                op:Meteor.userId(),
            }
        });



        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "contact.update",
            link: FlowRouter.getQueryParam("id")
        });

        toastr.success("联系人信息已更新");

        FlowRouter.go("/contact");
    },

});

Template.contactEdit.onRendered(function() {

});
