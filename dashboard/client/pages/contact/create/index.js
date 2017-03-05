Template.contactCreate.onCreated(function() {
    this.subscribe("contactBase");
});


Template.contactCreate.helpers({
    categorys: function(pid) {
        return Category.find({parent:pid});
    },
    areas:function(pid){
        return Area.find({parent:pid});
    }
});
Template.contactCreate.events({
    'click #save': function() {

        var contactId = Contact.insert({
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
            createdAt:new Date(),
            updatedAt:new Date(),
            status:true,
            op:Meteor.userId(),
        });

        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "contact.insert",
            link: contactId
        });

        toastr.success("联系人已添加");

        FlowRouter.go("/contact");
    },

});

Template.contactCreate.onRendered(function() {

});
