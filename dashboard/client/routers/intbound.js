
var group_inbound = FlowRouter.group({ name: "inbound-group", prefix: "/inbound" });
//地区首页
group_inbound.route('/', {
    name: "inbound", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'inbound' 
        }) } 

});

group_inbound.route('/detail', {
    name: "inboundDetail", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'inboundDetail' 
        }) } 

});
