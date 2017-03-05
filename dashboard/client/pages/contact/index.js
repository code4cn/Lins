Template.contact.onCreated(function() {
	
});
Template.contact.helpers({
    option: function() {
        return {
            method: "queryAllContact",
            fields: { category: 1,area:1 ,sex:1},
             selector: function() {
                return {
                    status: true,
                }
            },
            columns: [{
                title: "姓名",
                data: "name"
            }, {
                title: "昵称",
                data: "nick"
            },{
                title: "联系方式",
                data: "tel"
            },{
                title: "头衔",
                data: "title"
            },{
                title: "公司",
                data: "company"
            },{
                title: "性别",
                width: 50,
                render: function(row) {

                    return row.sex == "M" ? "男" : "女"
                },
            },{
                title: "类型",
                width: 150,
                data: "category_name"
            },{
                title: "地区",
                width: 150,
                data: "area_name"
            },{
                title: "最后更新",
                data: "updatedAt"
            }, {
                title: "操作",
                width: 200,
                render: function(row) {

                    var arr = [];

                    if (Roles.userIsInRole(Meteor.userId(), ['admin'], "dashboard")) {

                        arr.push("<a href='' onclick=\"_contact.delete(\'" + row._id + "\')\" > 删除 </a> ");

                        arr.push("<a href='/contact/edit?id=" + row._id + "'> 修改</a> ");

                       

                    }
                    return arr.join("|");
                },
            }],
        }
    }
});
Template.contact.events({

});
Template.contact.onRendered(function() {

});
_contact = {
    delete: function(id) {
        if (confirm("确认删除这条数据")) {
            Contact.update({_id:id},{$set:{status:false}});
            AdminTrack.insert({
                userId: Meteor.userId(),
                createdAt: new Date(),
                action: "contact.delete",
                link: id
            });
            grid.flash("contact");
        }
    },
}
