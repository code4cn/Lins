Template.inboundDetail.onCreated(function() {
    this.subscribe("inboundDetailBase");
    this.subscribe("inboundById", FlowRouter.getQueryParam("id"));
});

Template.inboundDetail.helpers({
    bound: function() {
        return Inbound.findOne({ _id: FlowRouter.getQueryParam("id") });
    },
    supplier: function() {

        var bound = Inbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        return bound ? Supplier.findOne({ _id: bound.supplier }) : {};
    },
    contact: function() {

        var bound = Inbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        return bound ? Contact.findOne({ _id: bound.contact }) : {};

    },
    depot: function() {

        var bound = Inbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        return bound ? Depot.findOne({ _id: bound.depot }) : {};
    },
    goods: function() {

        var bound = Inbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        return bound ? Goods.findOne({ _id: bound.goods }) : {};
    },
    admin: function() {

        var bound = Inbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        if (bound) {
            var depot = Depot.findOne({ _id: bound.depot });
            if (depot) {
                return Meteor.users.findOne({ _id: depot.admin });
            }
        }
    },
    op: function() {

        var bound = Inbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        if (bound) {
            return Meteor.users.findOne({ _id: bound.op });
        }

    },
    total: function(bound) {

        return bound ? (bound.price * bound.num + bound.logistic).toFixed(2) : "0.00";
    },
    checkLogistic: function(type) {
        for (var i = 0; i < _goods.logisticType.length; i++) {
            if (_goods.logisticType[i].key == type) {
                return _goods.logisticType[i].name
            }
        }
    },
    noResult: function() {
        var bound = Inbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        if (bound) {
            return !bound.check.depot.status;
        }
    }
});
Template.inboundDetail.events({
    'click #check': function() {

        if (confirm("确认物资已入库？")) {

            var bound = Inbound.findOne({ _id: FlowRouter.getQueryParam("id") });

            Inbound.update({ _id: bound._id }, {
                $set: {
                    "check.depot.status": true,
                    "check.depot.op": Meteor.userId(),
                    "check.depot.checkAt": new Date(),
                    updatedAt: new Date(),
                }
            });

            Goods.update({ _id: bound.goods }, {
                $inc: {
                    stock: bound.num,
                    stockIn: bound.num * -1
                },
                $set: {
                    updatedAt: new Date(),
                }
            });

            Supplier.update({ _id: bound.supplier }, {
                $inc: {
                    total: bound.num * bound.price,
                },
                $set: {
                    updatedAt: new Date(),
                }
            });

            Contact.update({ _id: bound.contact }, {
                $inc: {
                    total: bound.num * bound.price,
                },
                $set: {
                    updatedAt: new Date(),
                }
            });

            var ds = DepotStock.findOne({ goods: bound.goods, depot: bound.depot });

            if (ds) {
                DepotStock.update({ _id: ds._id }, {
                    $inc: {
                        num: bound.num,
                    },
                    $set: {
                        updatedAt: new Date(),
                    }
                });
            } else {
                DepotStock.insert({
                     goods: bound.goods, 
                     depot: bound.depot,
                     num:bound.num,
                     updatedAt: new Date(),
                     createdAt: new Date(),
                     lock:0,
                });
            }

            GoodsTracker.insert({
                goods: bound.goods, 
                depot: bound.depot,
                type:"in",
                createdAt: new Date(),
                bound:bound._id,
                supplier:bound.supplier,
                contact:bound.contact,
                check:Meteor.userId(),
            });

            AdminTrack.insert({
                userId: Meteor.userId(),
                createdAt: new Date(),
                action: "inbound.in.check",
                link: bound._id
            });

            toastr.success("入库单已签收");

            FlowRouter.go("/inbound");
        }


    },
    'click #cannel': function() {

        if (confirm("确认取消入库？")) {

            var bound = Inbound.findOne({ _id: FlowRouter.getQueryParam("id") });

            Inbound.update({ _id: bound._id }, {
                $set: {
                    "check.depot.status": false,
                    "check.depot.op": Meteor.userId(),
                    "check.depot.checkAt": new Date(),
                    updatedAt: new Date(),
                    status:false,
                }
            });

            Goods.update({ _id: bound.goods }, {
                $inc: {
                    stockIn: bound.num * -1
                },
                $set: {
                    updatedAt: new Date(),
                }
            });

            AdminTrack.insert({
                userId: Meteor.userId(),
                createdAt: new Date(),
                action: "inbound.in.cannel",
                link: bound._id
            });

            toastr.success("入库单已取消");

            FlowRouter.go("/inbound");
        }


    },

});

Template.inboundDetail.onRendered(function() {

});
