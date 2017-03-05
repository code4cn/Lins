Template.depotOut.onCreated(function() {
    this.subscribe("depotOutBase");
    this.subscribe("goodsByStockId", FlowRouter.getQueryParam("id"));
});

Template.depotOut.helpers({
    goods: function() {
        var ds = DepotStock.findOne(FlowRouter.getQueryParam("id"));
        if (ds) {
            return Goods.findOne({ _id: ds.goods });
        }
    },
    stock: function() {
        return DepotStock.findOne(FlowRouter.getQueryParam("id"));
    },
    admins: function(pid) {
        return Meteor.users.find({}, { sort: { "profile.name": 1 } });
    },
    num:function(){
        var ds = DepotStock.findOne(FlowRouter.getQueryParam("id"));
        if (ds) {
            return ds.num - (ds.lock ? ds.lock:0);
        }
    }
});
Template.depotOut.events({
    'click #save': function() {
        var ds = DepotStock.findOne(FlowRouter.getQueryParam("id"));
        if (ds) {
            var max = ds.num - (ds.lock ? ds.lock:0);
            if(max < $("#num").val() * 1){
                toastr.error("库存不足，剩余：" + max);
                return false;
            }
            var outboundId = Outbound.insert({
                stock:ds._id,
                goods: ds.goods,
                num: $("#num").val() * 1,
                logistic: $("#logistic").val() * 1,
                depot: ds.depot,
                remark: $("#remark").val(),
                duty:$("#admin").val(),
                op:Meteor.userId(),
                createdAt: new Date(),
                updatedAt: new Date(),
                status: true,
                move: "",
                check: {
                    depot: {
                        status: false,
                        op: "",
                    },
                    duty: {
                        status: false,
                        op: "",
                    },
                }
            });

            Goods.update({ _id: ds.goods }, { $inc: { stockOut: $("#num").val() * 1 } });

            DepotStock.update({ _id: ds._id }, { $inc: { lock: $("#num").val() * 1 } });

            AdminTrack.insert({
                userId: Meteor.userId(),
                createdAt: new Date(),
                action: "goods.out.create",
                link: outboundId
            });

            toastr.success("出库单已生成");

            FlowRouter.go("/depot/list?id=" + ds.depot);
        }

    },

});

Template.depotOut.onRendered(function() {

});
