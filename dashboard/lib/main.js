if (Meteor.isClient) {

    framework.logo = " L<b>i</b>ns";
    framework.title = "公益组织运营管理系统";
    framework.template.site = "site";
}

_roles.push({
    name: "物资管理员",
    desc: "管理物资",
    key: "goods",
})
