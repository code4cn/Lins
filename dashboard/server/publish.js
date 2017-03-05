
Meteor.publishComposite('areaById', function(id) {
    var uid = this.userId;
    return {
        find: function() {
            return Area.find({_id:id}, {});
        }
    }
});

Meteor.publishComposite('categoryById', function(id) {
    var uid = this.userId;
    return {
        find: function() {
            return Category.find({_id:id}, {});
        }
    }
});

Meteor.publishComposite('contactById', function(id) {
    var uid = this.userId;
    return {
        find: function() {
            return Contact.find({_id:id}, {});
        }
    }
});

Meteor.publish('contactBase', function(id) {
    var uid = this.userId;
    return [
    	Category.find({type:"contact"}, {}),
    	Area.find({}, {})
    ]
});
Meteor.publish('supplierBase', function(id) {
    var uid = this.userId;
    return [
        Category.find({type:"supplier"}, {}),
        Area.find({}, {}),
        Contact.find({status:true},{fields:{name:1}}),
    ]
});
Meteor.publish('depotBase', function(id) {
    var uid = this.userId;
    // console.log(Meteor.users.find({},{fields:{"profile.nickname":1}}).fetch());
    return [
        Category.find({type:"depot"}, {}),
        Area.find({}, {}),
        Meteor.users.find({type:"dashboard"},{fields:{"profile.nickname":1}}),
    ]
});
Meteor.publishComposite('supplierById', function(id) {
    var uid = this.userId;
    return {
        find: function() {
            return Supplier.find({_id:id}, {});
        }
    }
});
Meteor.publishComposite('depotById', function(id) {
    var uid = this.userId;
    return {
        find: function() {
            return Depot.find({_id:id}, {});
        }
    }
});

Meteor.publish('goodsBase', function(id) {
    var uid = this.userId;
    return [
        Category.find({type:"goods"}, {})
    ]
});
Meteor.publishComposite('goodsById', function(id) {
    var uid = this.userId;
    return {
        find: function() {
            return Goods.find({_id:id}, {});
        }
    }
});
Meteor.publish('goodsInBase', function(id) {
    var uid = this.userId;
    return [
        Supplier.find({status:true}, {}),
        Contact.find({status:true}, {}),
        Depot.find({status:true}, {})
    ]
});
Meteor.publishComposite('inboundById', function(id) {
    var uid = this.userId;
    return {
        find:function(){
           return Inbound.find({_id:id}, {})
        },
        children:[
            {
                find:function(bound){
                    return Supplier.find({_id:bound.supplier});
                }
            },
            {
                find:function(bound){
                    return DepotStock.find({goods:bound.goods,depot:bound.depot});
                }
            },
            {
                find:function(bound){
                    return Contact.find({_id:bound.contact});
                }
            },
            {
                find:function(bound){
                    return Goods.find({_id:bound.goods});
                }
            },
            {
                find:function(bound){
                    return Depot.find({_id:bound.depot});
                },
                children:[
                    {
                        find:function(depot){
                            return Meteor.users.find({_id:depot.admin},{fields:{"profile.nickname":1}});
                        },
                    }
                ]
            },
            {
                find:function(bound){
                    return Meteor.users.find({_id:bound.op},{fields:{"profile.nickname":1}});
                }
            }
        ]
    }
});
Meteor.publishComposite('goodsByStockId', function(id) {
    var uid = this.userId;
    return {
        find:function(){
           return DepotStock.find({_id:id}, {})
        },
        children:[
            {
                find:function(bound){
                    return Goods.find({_id:bound.goods});
                }
            },
            {
                find:function(bound){
                    return Depot.find({_id:bound.depot});
            },
                children:[
                    {
                        find:function(depot){
                            return Meteor.users.find({_id:depot.admin},{fields:{"profile.nickname":1}});
                        },
                    }
                ]
            }
        ]
    }
});
Meteor.publish('depotOutBase', function(id) {
    var uid = this.userId;
    // console.log(Meteor.users.find({},{fields:{"profile.nickname":1}}).fetch());
    return [
        Meteor.users.find({type:"dashboard"},{fields:{"profile.nickname":1}}),
    ]
});
Meteor.publishComposite('outboundById', function(id) {
    var uid = this.userId;
    return {
        find:function(){
           return Outbound.find({_id:id}, {})
        },
        children:[
            {
                find:function(bound){
                    return Goods.find({_id:bound.goods});
                }
            },
            {
                find:function(bound){
                    return Depot.find({_id:bound.depot});
                },
                children:[
                    {
                        find:function(depot){
                            return Meteor.users.find({_id:depot.admin},{fields:{"profile.nickname":1}});
                        },
                    }
                ]
            },
            {
                find:function(bound){
                    return Meteor.users.find({_id:bound.op},{fields:{"profile.nickname":1}});
                }
            },
            {
                find:function(bound){
                    return Meteor.users.find({_id:bound.duty},{fields:{"profile.nickname":1}});
                }
            }
        ]
    }
});
