Template.supplierCreate.onCreated(function() {
    this.subscribe("supplierBase");
});


Template.supplierCreate.helpers({
    categorys: function(pid) {
        return Category.find({parent:pid});
    },
    areas:function(pid){
        return Area.find({parent:pid});
    },
    contacts:function(pid){
        return Contact.find({},{sort:{name:1}});
    }
});
Template.supplierCreate.events({
    'click #save': function() {

        var supplierId = Supplier.insert({
            name: $("#name").val(),
            tel: $("#tel").val(),
            category: $("#category").val(),
            area: $("#area").val(),
            contact: $("#contact").val(),
            remark: $("#remark").val(),
            createdAt:new Date(),
            updatedAt:new Date(),
            status:true,
            op:Meteor.userId(),
        });

        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "supplier.insert",
            link: supplierId
        });

        toastr.success("供应商已添加");

        FlowRouter.go("/supplier");
    },

});

Template.supplierCreate.onRendered(function() {

});
