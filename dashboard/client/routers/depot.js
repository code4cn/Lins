
var group_depot = FlowRouter.group({ name: "depot-group", prefix: "/depot" });
//地区首页
group_depot.route('/', {
    name: "depot", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'depot' 
        }) } 

});
group_depot.route('/create', {
    name: "depotCreate", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'depotCreate' 
        }) } 

});
group_depot.route('/edit', {
    name: "depotEdit", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'depotEdit' 
        }) } 

});
group_depot.route('/list', {
    name: "depotList", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'depotList' 
        }) } 

});
group_depot.route('/out', {
    name: "depotOut", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'depotOut' 
        }) } 

});
// group_depot.route('/move', {
//     name: "depotMove", 
//     action: function(params, queryParams){ 

//         BlazeLayout.render("dashboard", { 
//             content: 'depotList' 
//         }) } 

// });