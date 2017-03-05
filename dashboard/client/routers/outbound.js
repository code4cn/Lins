var group_outbound = FlowRouter.group({ name: "outbound-group", prefix: "/outbound" });
//地区首页
group_outbound.route('/', {
    name: "outbound", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'outbound' 
        }) } 

});
group_outbound.route('/detail', {
    name: "outboundDetail", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'outboundDetail' 
        }) } 

});