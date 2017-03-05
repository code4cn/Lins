Template.depotList.onCreated(function() {
	// this.subscribe("depotListBase",{onReady:function(){}});
});
Template.depotList.helpers({
    option: function() {
        return {
            method: "queryAllDepotList",
            fields: {goods:1,num:1},
             selector: function() {
                return {}
            },
            columns: [{
                title: "名称",
                data: "goods_name"
            }, {
                title: "库存量",
                 render:function(row){
                    return row.num + row.goods_unit;
                }
            },{
                title: "锁定量",
                data: "lock"
            }, {
                title: "最后更新",
                data: "updatedAt"
            }, {
                title: "操作",
                width: 240,
                render: function(row) {

                    var arr = [];

                    if (Roles.userIsInRole(Meteor.userId(), ['admin','depotList'], "dashboard")) {

                        arr.push("<a href='/depot/out?id=" + row._id + "'> 出库</a> ");
                        // arr.push("<a href='/depot/move?id=" + row._id + "'> 移库</a> ");

                    }
                    return arr.join("|");
                },
            }],
        }
    }
});
Template.depotList.events({

});
Template.depotList.onRendered(function() {

});

