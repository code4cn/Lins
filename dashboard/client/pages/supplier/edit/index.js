Template.supplierEdit.onCreated(function() {
    this.subscribe("supplierBase");
    this.subscribe("supplierById", FlowRouter.getQueryParam("id"));
});


Template.supplierEdit.helpers({
    supplier: function() {
        return Supplier.findOne({ _id: FlowRouter.getQueryParam("id") });
    },
    categorys: function(pid) {
        return Category.find({parent:pid});
    },
    areas: function(pid) {
        return Area.find({ parent: pid });
    },
    contacts: function(pid) {
        return Contact.find({}, { sort: { name: 1 } });
    },
    checkStatus: function(str1, str2) {
        return str1 == str2 ? "selected" : "";
    }
});
Template.supplierEdit.events({
    'click #save': function() {

        var supplier = Supplier.findOne({ _id: FlowRouter.getQueryParam("id") })



        Supplier.update({ _id: FlowRouter.getQueryParam("id") }, {
            $set: {
                name: $("#name").val(),
                tel: $("#tel").val(),
                category: $("#category").val(),
                area: $("#area").val(),
                contact: $("#contact").val(),
                remark: $("#remark").val(),
                updatedAt: new Date(),
                op: Meteor.userId(),
            }
        });



        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "supplier.update",
            link: FlowRouter.getQueryParam("id")
        });

        toastr.success("供应商信息已更新");

        FlowRouter.go("/supplier");
    },

});

Template.supplierEdit.onRendered(function() {

});
