var group_goods = FlowRouter.group({ name: "goods-group", prefix: "/goods" });
//地区首页
group_goods.route('/', {
    name: "goods",
    action: function(params, queryParams) {

        BlazeLayout.render("dashboard", {
            content: 'goods'
        })
    }

});
group_goods.route('/create', {
    name: "goodsCreate",
    action: function(params, queryParams) {

        BlazeLayout.render("dashboard", {
            content: 'goodsCreate'
        })
    }

});
group_goods.route('/edit', {
    name: "goodsEdit",
    action: function(params, queryParams) {

        BlazeLayout.render("dashboard", {
            content: 'goodsEdit'
        })
    }
});
group_goods.route('/in', {
    name: "goodsIn",
    action: function(params, queryParams) {

        BlazeLayout.render("dashboard", {
            content: 'goodsIn'
        })
    }
});
group_goods.route('/out', {
    name: "goodsOut",
    action: function(params, queryParams) {
        BlazeLayout.render("dashboard", {
            content: 'goodsOut'
        })
    }
});
