var group_movebound = FlowRouter.group({ name: "movebound-group", prefix: "/movebound" });
//地区首页
group_movebound.route('/', {
    name: "movebound", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'movebound' 
        }) } 
});