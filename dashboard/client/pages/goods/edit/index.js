Template.goodsEdit.onCreated(function() {
    this.subscribe("goodsBase");
    this.subscribe("goodsById", FlowRouter.getQueryParam("id"));
});


Template.goodsEdit.helpers({
    goods: function() {
        return Goods.findOne({ _id: FlowRouter.getQueryParam("id") });
    },
    categorys: function(pid) {
        return Category.find({parent:pid});
    },
    checkStatus: function(str1, str2) {
        return str1 == str2 ? "selected" : "";
    }
});
Template.goodsEdit.events({
    'click #save': function() {

        var goods = Goods.findOne({ _id: FlowRouter.getQueryParam("id") })



        Goods.update({ _id: FlowRouter.getQueryParam("id") }, {
            $set: {
                name: $("#name").val(),
                category: $("#category").val(),
                unit: $("#unit").val(),
                code: $("#code").val(),
                remark: $("#remark").val(),
                purpose: $("#purpose").val(),
                price: $("#price").val()*1,
                updatedAt: new Date(),
                op: Meteor.userId(),
            }
        });



        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "goods.update",
            link: FlowRouter.getQueryParam("id")
        });

        toastr.success("物资信息已更新");

        FlowRouter.go("/goods");
    },

});

Template.goodsEdit.onRendered(function() {

});
