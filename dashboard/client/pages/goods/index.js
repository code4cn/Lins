Template.goods.onCreated(function() {
	// this.subscribe("goodsBase",{onReady:function(){}});
});
Template.goods.helpers({
    option: function() {
        return {
            method: "queryAllgoods",
            fields: { category: 1,unit:1,price:1,stock:1,stockIn:1,stockOut:1},
             selector: function() {
                return {
                    status: true,
                }
            },
            columns: [{
                title: "名称",
                data: "name"
            }, {
                title: "条码",
                data: "code"
            },{
                title: "类型",
                data: "category_name"
            },{
                title: "总价值",
                render:function(row){
                    return (row.stock * row.price).toFixed(2) + "元"
                }
            },{
                title: "库存量",
                render:function(row){
                    return row.stock + row.unit;
                }
            },{
                title: "待入库",
                render:function(row){
                    return row.stockIn + row.unit;
                }
            },{
                title: "待出库",
                render:function(row){
                    return row.stockOut + row.unit;
                }
            },{
                title: "最后更新",
                data: "updatedAt"
            }, {
                title: "操作",
                width: 240,
                render: function(row) {

                    var arr = [];

                    if (Roles.userIsInRole(Meteor.userId(), ['admin'], "dashboard")) {

                        arr.push("<a href='' onclick=\"_goods.delete(\'" + row._id + "\')\" > 删除 </a> ");

                        arr.push("<a href='/goods/edit?id=" + row._id + "'> 修改</a> ");


                       

                    }

                    if (Roles.userIsInRole(Meteor.userId(), ['admin','goods'], "dashboard")) {

                        // arr.push("<a href='/goods/out?id=" + row._id + "'> 出库</a> ");
                        arr.push("<a href='/goods/in?id=" + row._id + "'> 入库</a> ");

                    }
                    return arr.join("|");
                },
            }],
        }
    }
});
Template.goods.events({

});
Template.goods.onRendered(function() {

});
_goods = {
    logisticType:[
        {key:"targetPayQ",name:"对方支付快递"},
        {key:"minePayQ",name:"自己支付快递"},
        {key:"targetPayN",name:"对方支付普通"},
        {key:"minePayN",name:"自己支付普通"},
        {key:"thridPayQ",name:"第三方支付快递"},
        {key:"thridPayN",name:"第三方支付普通"}
    ],
    delete: function(id) {
        if (confirm("确认删除这条数据")) {
            Goods.update({_id:id},{$set:{status:false}});
            AdminTrack.insert({
                userId: Meteor.userId(),
                createdAt: new Date(),
                action: "goods.delete",
                link: id
            });
            grid.flash("goods");
        }
    },
}
