
var group_contact = FlowRouter.group({ name: "contact-group", prefix: "/contact" });
//地区首页
group_contact.route('/', {
    name: "contact", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'contact' 
        }) } 

});
group_contact.route('/create', {
    name: "contactCreate", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'contactCreate' 
        }) } 

});
group_contact.route('/edit', {
    name: "contactEdit", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'contactEdit' 
        }) } 

});