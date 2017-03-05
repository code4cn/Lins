Template.area.onCreated(function() {

});
Template.area.helpers({
    isChildren: function() {
    	var obj = grid.param("area");

        return "?parent=" + (obj ? obj.selector.parent : "root");
    },
    isNotRoot:function(){
        var obj = grid.param("area");
        return !(obj && (obj.selector.parent == "root")) ;
    },
    option: function() {
        return {
            method: "queryAllArea",
            // collection: "users",
            selector: function() {
                return {
                    parent: FlowRouter.getQueryParam("parent") ? FlowRouter.getQueryParam("parent") : "root",
                }
            },
            fields: { },
            columns: [{
                title: "地区",
                data: "name"
            }, {
                title: "操作",
                width: 100,
                render: function(row) {

                    var arr = [];

                    if (Roles.userIsInRole(Meteor.userId(), ['admin'], "dashboard")) {

                        arr.push("<a href='' onclick=\"_area.delete(\'" + row._id + "\')\" > 删除 </a> ");

                        arr.push("<a href='/area/edit?id=" + row._id + "'> 修改</a> ");

                        var obj = grid.param("area");
                      
                        if (obj && obj.selector.parent == "root") {
                            arr.push("<a href='' onclick=\"_area.children(\'" + row._id + "\')\" > 子区域 </a>");
                        }

                    }
                    return arr.join("|");
                },
            }],
        }
    }
});
Template.area.events({

});
Template.area.onRendered(function() {

});
_area = {
    delete: function(id) {
        if (confirm("确认删除这条数据")) {
            Area.remove(id);
            AdminTrack.insert({
                userId: Meteor.userId(),
                createdAt: new Date(),
                action: "area.delete",
                link: id
            });
            grid.flash("area");
        }
    },
    children:function(id){
    	grid.reload("area",{
                    parent: id,
                });
    }
}
