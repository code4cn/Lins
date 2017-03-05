Template.outbound.onCreated(function() {
	// this.subscribe("outboundBase",{onReady:function(){}});
});
Template.outbound.helpers({
    option: function() {
        return {
            method: "queryAllOutbound",
            fields: { depot:1,price:1,goods:1,logistic:1,check:1,status:1,num:1,op:1,duty:1},
             selector: function() {
                return {
                    
                }
            },
            sort:{updatedAt:-1},
            columns: [{
                title: "单号",
                render:function(row){
                    return row._id.substr(0,8).toUpperCase();
                }
            }, {
                title: "名称",
                data: "goods_name"
            },{
                title: "数量",
                render:function(row){
                    return row.num + row.goods_unit;
                }
            },{
                title: "物流费用",
                data: "logistic"
            },{
                title: "发起人",
                data: "op_name"
            },{
                title: "来源仓库",
                data: "depot_name"
            },{
                title: "验发人",
                data: "admin_name"
            },{
                title: "验收人",
                data: "duty_name"
            },{
                title: "最后更新",
                data: "updatedAt"
            }, {
                title: "状态",
                render: function(row){
                    if(!row.status){
                        return "已取消";
                    }
                    if(row.check.depot.status && row.check.duty.status){
                        return "已完成";
                    }else if(row.check.depot.status){
                    	return "已出库";
                    }else{
                        return "待出库";
                    }
                }
            }, {
                title: "操作",
                width: 60,
                render: function(row) {
                    var arr = [];

                    if (Roles.userIsInRole(Meteor.userId(), ['admin','outbound'], "dashboard")) {

                        arr.push("<a href='/outbound/detail?id=" + row._id + "'> 详情 </a> ");

                    }
                    return arr.join("|");
                },
            }],
        }
    }
});
Template.outbound.events({

});
Template.outbound.onRendered(function() {

});
