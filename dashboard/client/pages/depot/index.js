Template.depot.onCreated(function() {
	// this.subscribe("depotBase",{onReady:function(){}});
});
Template.depot.helpers({
    option: function() {
        return {
            method: "queryAllDepot",
            fields: { category: 1,area:1 ,sex:1,admin:1},
             selector: function() {
                return {
                    status: true,
                }
            },
            columns: [{
                title: "姓名",
                data: "name"
            }, {
                title: "联系方式",
                data: "tel"
            },{
                title: "类型",
                width: 80,
                data: "category_name"
            },{
                title: "详细地址",
                data: "address"
            },{
                title: "地区",
                width: 80,
                data: "area_name"
            },{
                title: "详细地址",
                data: "address"
            },{
                title: "负责人",
                width: 150,
                data: "admin_name"
            },{
                title: "最后更新",
                data: "updatedAt"
            }, {
                title: "操作",
                width: 200,
                render: function(row) {

                    var arr = [];

                    if (Roles.userIsInRole(Meteor.userId(), ['admin'], "dashboard")) {

                        arr.push("<a href='' onclick=\"_depot.delete(\'" + row._id + "\')\" > 删除 </a> ");

                        arr.push("<a href='/depot/edit?id=" + row._id + "'> 修改</a> ");

                    }
                    if (Roles.userIsInRole(Meteor.userId(), ["admin",'goods'], "dashboard")) {
                        arr.push("<a href='/depot/list?id=" + row._id + "' > 库存管理 </a> ");

                    }
                    return arr.join("|");
                },
            }],
        }
    }
});
Template.depot.events({

});
Template.depot.onRendered(function() {

});
_depot = {
    delete: function(id) {
        if (confirm("确认删除这条数据")) {
            Depot.update({_id:id},{$set:{status:false}});
            AdminTrack.insert({
                userId: Meteor.userId(),
                createdAt: new Date(),
                action: "depot.delete",
                link: id
            });
            grid.flash("depot");
        }
    },
}
