Template.inbound.onCreated(function() {
	// this.subscribe("inboundBase",{onReady:function(){}});
});
Template.inbound.helpers({
    option: function() {
        return {
            method: "queryAllInbound",
            sort:{updatedAt:-1},
            fields: { supplier: 1,depot:1,contact:1,price:1,goods:1,logisticType:1,logistic:1,check:1,status:1},
             selector: function() {
                return {
                    
                }
            },
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
                data: "num"
            },{
                title: "总价值",
                render:function(row){
                    return (row.num * row.price).toFixed(2) + "元"
                }
            },{
                title: "发出人",
                render:function(row){
                	var name = [];
                    if(row.supplier_name){
                    	name.push(row.supplier_name);
                    }
                    if(row.contact_name){
                    	name.push(row.contact_name);
                    }
                    return name.join("|");
                }
            },{
                title: "目标仓库",
                data: "depot_name"
            },{
                title: "接受人",
                data: "admin_name"
            },{
                title: "最后更新",
                data: "updatedAt"
            }, {
                title: "状态",
                render: function(row){
                    if(!row.status){
                        return "已取消";
                    }
                    if(row.check.depot.status){
                        return "已签收";
                    }else{
                        return "待签收";
                    }
                }
            }, {
                title: "操作",
                width: 60,
                render: function(row) {
                    var arr = [];

                    if (Roles.userIsInRole(Meteor.userId(), ['admin','inbound'], "dashboard")) {

                        arr.push("<a href='/inbound/detail?id=" + row._id + "'> 详情 </a> ");

                    }
                    return arr.join("|");
                },
            }],
        }
    }
});
Template.inbound.events({

});
Template.inbound.onRendered(function() {

});
