
var group_area = FlowRouter.group({ name: "area-group", prefix: "/area" });
//地区首页
group_area.route('/', {
    name: "area", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'area' 
        }) } 

});
group_area.route('/create', {
    name: "areaCreate", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'areaCreate' 
        }) } 

});
group_area.route('/edit', {
    name: "areaEdit", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'areaEdit' 
        }) } 

});
