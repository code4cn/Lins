Template.supplier.onCreated(function() {
	// this.subscribe("supplierBase",{onReady:function(){}});
});
Template.supplier.helpers({
    option: function() {
        return {
            method: "queryAllsupplier",
            fields: { category: 1,area:1 ,sex:1,contact:1},
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
                width: 150,
                data: "category_name"
            },{
                title: "地区",
                width: 150,
                data: "area_name"
            },{
                title: "联系人",
                width: 150,
                data: "contact_name"
            },{
                title: "最后更新",
                data: "updatedAt"
            }, {
                title: "操作",
                width: 200,
                render: function(row) {

                    var arr = [];

                    if (Roles.userIsInRole(Meteor.userId(), ['admin'], "dashboard")) {

                        arr.push("<a href='' onclick=\"_supplier.delete(\'" + row._id + "\')\" > 删除 </a> ");

                        arr.push("<a href='/supplier/edit?id=" + row._id + "'> 修改</a> ");

                    }
                    return arr.join("|");
                },
            }],
        }
    }
});
Template.supplier.events({

});
Template.supplier.onRendered(function() {

});
_supplier = {
    delete: function(id) {
        if (confirm("确认删除这条数据")) {
            supplier.update({_id:id},{$set:{status:false}});
            AdminTrack.insert({
                userId: Meteor.userId(),
                createdAt: new Date(),
                action: "supplier.delete",
                link: id
            });
            grid.flash("supplier");
        }
    },
}
