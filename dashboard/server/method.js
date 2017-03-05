Meteor.methods({
    queryAllArea: function(sel, pro) {
        return {
            rows: Area.find(sel, pro).fetch(),
            total: Area.find(sel, pro).count()
        };
    },
    queryAllCategory: function(sel, pro) {
        return {
            rows: Category.find(sel, pro).fetch(),
            total: Category.find(sel, pro).count()
        };
    },
    queryAllContact: function(sel, pro) {
        var objs = Contact.find(sel, pro).fetch();

        var arr = [];
        for (var i = 0; i < objs.length; i++) {

            var obj = objs[i];

            var category = Category.findOne({ _id: obj.category });

            if (category) {
                obj.category_name = category.name;
            }

            var area = Area.findOne({ _id: obj.area });

            if (area) {
                obj.area_name = area.name;
            }

            arr.push(obj);
        }

        return {
            rows: arr,
            total: Contact.find(sel, pro).count()
        };
    },
    queryAllsupplier: function(sel, pro) {

        var objs = Supplier.find(sel, pro).fetch();

        var arr = [];

        for (var i = 0; i < objs.length; i++) {

            var obj = objs[i];

            var category = Category.findOne({ _id: obj.category });

            if (category) {
                obj.category_name = category.name;
            }

            var area = Area.findOne({ _id: obj.area });

            if (area) {
                obj.area_name = area.name;
            }

            var contact = Contact.findOne({ _id: obj.contact });

            if (contact) {
                obj.contact_name = contact.name;
            }

            arr.push(obj);
        }
        return {
            rows: arr,
            total: Supplier.find(sel, pro).count()
        };
    },
    queryAllDepot: function(sel, pro) {

        var objs = Depot.find(sel, pro).fetch();

        var arr = [];

        for (var i = 0; i < objs.length; i++) {

            var obj = objs[i];

            var category = Category.findOne({ _id: obj.category });

            if (category) {
                obj.category_name = category.name;
            }

            var area = Area.findOne({ _id: obj.area });

            if (area) {
                obj.area_name = area.name;
            }

            var admin = Meteor.users.findOne({ _id: obj.admin });

            if (admin) {
                obj.admin_name = admin.profile.nickname;
            }

            arr.push(obj);
        }
        return {
            rows: arr,
            total: Depot.find(sel, pro).count()
        };
    },
    queryAllgoods: function(sel, pro) {

        var objs = Goods.find(sel, pro).fetch();

        var arr = [];

        for (var i = 0; i < objs.length; i++) {

            var obj = objs[i];

            var category = Category.findOne({ _id: obj.category });

            if (category) {
                obj.category_name = category.name;
            }


            arr.push(obj);
        }
        return {
            rows: arr,
            total: Goods.find(sel, pro).count()
        };
    },
    queryAllInbound: function(sel, pro) {

        var objs = Inbound.find(sel, pro).fetch();

        var arr = [];

        for (var i = 0; i < objs.length; i++) {

            var obj = objs[i];

            var goods = Goods.findOne({ _id: obj.goods });

            if (goods) {
                obj.goods_name = goods.name;
            }

            var supplier = Supplier.findOne({ _id: obj.supplier });

            if (supplier) {
                obj.supplier_name = supplier.name;
            }

            var contact = Contact.findOne({ _id: obj.contact });

            if (contact) {
                obj.contact_name = contact.name;
            }

            var depot = Depot.findOne({ _id: obj.depot });

            if (depot) {
                obj.depot_name = depot.name;
            }

            var depot = Depot.findOne({ _id: obj.depot });

            if (depot) {

                obj.depot_name = depot.name;

                var admin = Meteor.users.findOne({ _id: depot.admin });

                if (admin) {

                    obj.admin_name = admin.profile.nickname;
                }

            }



            arr.push(obj);
        }

        return {
            rows: arr,
            total: Inbound.find(sel, pro).count()
        };
    },
    queryAllDepotList: function(sel, pro) {

        var objs = DepotStock.find(sel, pro).fetch();

        var arr = [];

        for (var i = 0; i < objs.length; i++) {

            var obj = objs[i];

            var goods = Goods.findOne({ _id: obj.goods });

            if (goods) {
                obj.goods_name = goods.name;
                obj.goods_unit = goods.unit;
            }

            arr.push(obj);
        }

        return {
            rows: arr,
            total: DepotStock.find(sel, pro).count()
        };
    },
    queryAllOutbound: function(sel, pro) {
     
        var objs = Outbound.find(sel, pro).fetch();

        var arr = [];

        for (var i = 0; i < objs.length; i++) {

            var obj = objs[i];

            var goods = Goods.findOne({ _id: obj.goods });

            if (goods) {
                obj.goods_name = goods.name;
                obj.goods_unit = goods.unit;
            }


            var depot = Depot.findOne({ _id: obj.depot });

            if (depot) {
                obj.depot_name = depot.name;
            }

            var depot = Depot.findOne({ _id: obj.depot });

            if (depot) {

                obj.depot_name = depot.name;

                var admin = Meteor.users.findOne({ _id: depot.admin });

                if (admin) {

                    obj.admin_name = admin.profile.nickname;
                }

            }

            var duty = Meteor.users.findOne({ _id: obj.duty });


            if (duty) {

                obj.duty_name = duty.profile.nickname;
            }

            var op = Meteor.users.findOne({ _id: obj.op });

            if (op) {

                obj.op_name = op.profile.nickname;
            }

            arr.push(obj);
        }

        return {
            rows: arr,
            total: Outbound.find(sel, pro).count()
        };
    },
});
