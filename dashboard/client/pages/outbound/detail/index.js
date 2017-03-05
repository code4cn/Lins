Template.outboundDetail.onCreated(function() {
    this.subscribe("outboundDetailBase");
    this.subscribe("outboundById", FlowRouter.getQueryParam("id"));
});

Template.outboundDetail.helpers({
    bound: function() {
        return Outbound.findOne({ _id: FlowRouter.getQueryParam("id") });
    },

    depot: function() {

        var bound = Outbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        return bound ? Depot.findOne({ _id: bound.depot }) : {};
    },
    goods: function() {

        var bound = Outbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        return bound ? Goods.findOne({ _id: bound.goods }) : {};
    },
    admin: function() {

        var bound = Outbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        if (bound) {
            var depot = Depot.findOne({ _id: bound.depot });
            if (depot) {
                return Meteor.users.findOne({ _id: depot.admin });
            }
        }
    },
    op: function() {

        var bound = Outbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        if (bound) {
            return Meteor.users.findOne({ _id: bound.op });
        }

    },
    duty: function() {

        var bound = Outbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        if (bound) {
            return Meteor.users.findOne({ _id: bound.duty });
        }

    },
    isLock: function() {
        var bound = Outbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        if (bound) {
            return !bound.check.depot.status || !bound.check.duty.status;
        }
    },
    noResult: function() {
        var bound = Outbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        if (bound) {
            return !(bound.check.depot.status && bound.check.duty.status);
        }
    },
    isDepotAdmin: function() {

        var bound = Outbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        if (bound) {
            var depot = Depot.findOne({ _id: bound.depot });

            if (depot) {

                return depot.admin == Meteor.userId();
            }
        }
    },
    isDuty: function() {

        var bound = Outbound.findOne({ _id: FlowRouter.getQueryParam("id") });

        if (bound && bound.check.depot.status) {
            return bound.duty == Meteor.userId();
        }
    }
});
Template.outboundDetail.events({
    'click #checkDepot': function() {

        if (confirm("确认物资已出库？")) {

            var bound = Outbound.findOne({ _id: FlowRouter.getQueryParam("id") });

            Outbound.update({ _id: bound._id }, {
                $set: {
                    "check.depot.status": true,
                    "check.depot.op": Meteor.userId(),
                    "check.depot.checkAt": new Date(),
                    updatedAt: new Date(),
                }
            });

            Goods.update({ _id: bound.goods }, {
                $inc: {
                    stock: bound.num * -1,
                    stockOut: bound.num * -1
                },
                $set: {
                    updatedAt: new Date(),
                }
            });

           

            DepotStock.update({ _id: bound.stock }, {
                $inc: {
                    num: bound.num * -1,
                    lock: bound.num * -1,
                },
                $set: {
                    updatedAt: new Date(),
                }
            });

            GoodsTracker.insert({
                goods: bound.goods,
                depot: bound.depot,
                type: "out",
                createdAt: new Date(),
                bound: bound._id,
                supplier: bound.supplier,
                contact: bound.contact,
                check: Meteor.userId(),
            });

            AdminTrack.insert({
                userId: Meteor.userId(),
                createdAt: new Date(),
                action: "goods.out.check.depot",
                link: bound._id
            });

            toastr.success("物资已出库");

            FlowRouter.go("/outbound");
        }


    },
    'click #checkDuty': function() {

        if (confirm("确认物资已接收？")) {

            var bound = Outbound.findOne({ _id: FlowRouter.getQueryParam("id") });

            Outbound.update({ _id: bound._id }, {
                $set: {
                    "check.duty.status": true,
                    "check.duty.op": Meteor.userId(),
                    "check.duty.checkAt": new Date(),
                    updatedAt: new Date(),
                }
            });

            AdminTrack.insert({
                userId: Meteor.userId(),
                createdAt: new Date(),
                action: "goods.out.check.duty",
                link: bound._id
            });

            toastr.success("物资已接收");

            FlowRouter.go("/outbound");
        }


    },
    'click #cannel': function() {

        if (confirm("确认取消取库？")) {

            var bound = Outbound.findOne({ _id: FlowRouter.getQueryParam("id") });

            Outbound.update({ _id: bound._id }, {
                $set: {
                    updatedAt: new Date(),
                    status: false,
                }
            });

            Goods.update({ _id: bound.goods }, {
                $inc: {
                    stockOut: bound.num * -1
                },
                $set: {
                    updatedAt: new Date(),
                }
            });

            var ds = DepotStock.findOne({ goods: bound.goods, depot: bound.depot });

            DepotStock.update({ _id: ds._id }, {
                $inc: {
                    lock: bound.num * -1,
                },
                $set: {
                    updatedAt: new Date(),
                }
            });
            AdminTrack.insert({
                userId: Meteor.userId(),
                createdAt: new Date(),
                action: "goods.out.cannel",
                link: bound._id
            });

            toastr.success("出库单已取消");

            FlowRouter.go("/outbound");
        }


    },

});

Template.outboundDetail.onRendered(function() {

});
