Template.goodsIn.onCreated(function() {
    this.subscribe("goodsInBase");
    this.subscribe("goodsById", FlowRouter.getQueryParam("id"));
});

Template.goodsIn.helpers({
    goods: function() {
        return Goods.findOne({ _id: FlowRouter.getQueryParam("id") });
    },
    suppliers: function() {
        return Supplier.find({}, { sort: { name: 1 } });
    },
    contacts: function(pid) {
        return Contact.find({}, { sort: { name: 1 } });
    },
    depots: function(pid) {
        return Depot.find({}, { sort: { name: 1 } });
    },
    types: function() {
        return _goods.logisticType;
    }
});
Template.goodsIn.events({
    'click #save': function() {

        var intboundId = Inbound.insert({
            goods:FlowRouter.getQueryParam("id"),
            num: $("#num").val() * 1,
            logistic: $("#logistic").val() * 1,
            price: $("#price").val() * 1,
            supplier: $("#supplier").val(),
            contact: $("#contact").val(),
            depot: $("#depot").val(),
            logisticType: $("#logisticType").val(),
            remark: $("#remark").val(),
            createdAt: new Date(),
            updatedAt: new Date(),
            status: true,
            op: Meteor.userId(),
            move:"",
            check:{
                depot:{
                    status:false,
                    op:"",
                },
            }
        });

        Goods.update({_id:FlowRouter.getQueryParam("id")},{$inc:{stockIn:$("#num").val() * 1}});

        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "goods.in.create",
            link: intboundId
        });

        toastr.success("入库单已生成");

        FlowRouter.go("/goods");
    },

});

Template.goodsIn.onRendered(function() {

});
