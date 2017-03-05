Template.goodsCreate.onCreated(function() {
    this.subscribe("goodsBase");
});


Template.goodsCreate.helpers({
    categorys: function(pid) {
        return Category.find({parent:pid});
    },
    contacts:function(pid){
        return Contact.find({},{sort:{name:1}});
    }
});
Template.goodsCreate.events({
    'click #save': function() {

        var goodsId = Goods.insert({
            name: $("#name").val(),
            category: $("#category").val(),
            unit: $("#unit").val(),
            code: $("#code").val(),
            remark: $("#remark").val(),
            purpose: $("#purpose").val(),
            price: $("#price").val()*1,
            createdAt:new Date(),
            updatedAt:new Date(),
            status:true,
            op:Meteor.userId(),
            stock:0,//仓库中
            stockIn:0,//待入库
            stockOut:0,//待出库
        });

        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "goods.insert",
            link: goodsId
        });

        toastr.success("物资已添加");

        FlowRouter.go("/goods");
    },

});

Template.goodsCreate.onRendered(function() {

});
