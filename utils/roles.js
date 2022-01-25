const AccessControl = require("accesscontrol");

const flatList = [

    //roles for admin
    { role: 'admin', resource: 'campaign', action: 'create:any' },
    { role: 'admin', resource: 'campaign', action: 'read:any' },
    { role: 'admin', resource: 'campaign', action: 'update:any' },
    { role: 'admin', resource: 'campaign', action: 'delete:any' },

    { role: 'admin', resource: 'language', action: 'create:any' },
    { role: 'admin', resource: 'language', action: 'read:any' },
    { role: 'admin', resource: 'language', action: 'update:any' },
    { role: 'admin', resource: 'language', action: 'delete:any' },

    { role: 'admin', resource: 'product', action: 'create:any' },
    { role: 'admin', resource: 'product', action: 'read:any' },
    { role: 'admin', resource: 'product', action: 'update:any' },
    { role: 'admin', resource: 'product', action: 'delete:any' },

    { role: 'admin', resource: 'territory', action: 'create:any' },
    { role: 'admin', resource: 'territory', action: 'read:any' },
    { role: 'admin', resource: 'territory', action: 'update:any' },
    { role: 'admin', resource: 'territory', action: 'delete:any' },

    { role: 'admin', resource: 'user', action: 'create:any' },
    { role: 'admin', resource: 'user', action: 'read:any' },
    { role: 'admin', resource: 'user', action: 'update:any' },
    { role: 'admin', resource: 'user', action: 'delete:any' },

    { role: 'admin', resource: 'currency', action: 'create:any' },
    { role: 'admin', resource: 'currency', action: 'read:any' },
    { role: 'admin', resource: 'currency', action: 'update:any' },
    { role: 'admin', resource: 'currency', action: 'delete:any' },

    //roles for vendor

    { role: 'vendor', resource: 'campaign', action: 'create:any' },
    { role: 'vendor', resource: 'campaign', action: 'read:any' },
    { role: 'vendor', resource: 'campaign', action: 'update:any' },
    { role: 'vendor', resource: 'campaign', action: 'delete:any' },

    { role: 'vendor', resource: 'language', action: 'create:any' },
    { role: 'vendor', resource: 'language', action: 'read:any' },
    { role: 'vendor', resource: 'language', action: 'update:any' },
    { role: 'vendor', resource: 'language', action: 'delete:any' },

    { role: 'vendor', resource: 'product', action: 'create:any' },
    { role: 'vendor', resource: 'product', action: 'read:any' },
    { role: 'vendor', resource: 'product', action: 'update:any' },
    { role: 'vendor', resource: 'product', action: 'delete:any' },

    { role: 'vendor', resource: 'territory', action: 'create:any' },
    { role: 'vendor', resource: 'territory', action: 'read:any' },
    { role: 'vendor', resource: 'territory', action: 'update:any' },
    { role: 'vendor', resource: 'territory', action: 'delete:any' },

    { role: 'vendor', resource: 'user', action: 'create:any' },
    { role: 'vendor', resource: 'user', action: 'read:any' },
    { role: 'vendor', resource: 'user', action: 'update:any' },
    { role: 'vendor', resource: 'user', action: 'delete:any' },

    { role: 'vendor', resource: 'currency', action: 'create:any' },
    { role: 'vendor', resource: 'currency', action: 'read:any' },
    { role: 'vendor', resource: 'currency', action: 'update:any' },
    { role: 'vendor', resource: 'currency', action: 'delete:any' },


    //roles for supervisor
];
const ac = new AccessControl(flatList);
exports.roles = (function() {
    return ac;
})();
