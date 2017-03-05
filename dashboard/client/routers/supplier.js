var group_supplier = FlowRouter.group({ name: "supplier-group", prefix: "/supplier" });
//地区首页
group_supplier.route('/', {
    name: "supplier", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'supplier' 
        }) } 

});
group_supplier.route('/create', {
    name: "supplierCreate", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'supplierCreate' 
        }) } 

});
group_supplier.route('/edit', {
    name: "supplierEdit", 
    action: function(params, queryParams){ 

        BlazeLayout.render("dashboard", { 
            content: 'supplierEdit' 
        }) } 

});