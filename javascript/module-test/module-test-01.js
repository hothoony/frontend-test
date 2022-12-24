let moduleName = "NO moduleName";

let module_v1 = {
    moduleName: 'module_v1',
    init: function() {
        console.log('init', this.moduleName);
    },
    change: function() {
        console.log('change', this.moduleName);
    }
};

let module_v2 = function() {
    let moduleName = "module_v2";
    function init() {
        console.log('init', moduleName);
    }
    return {
        change: function() {
            console.log('change', moduleName);
        }
    };
}();

let module_v3 = function() {
    let moduleName = "module_v3";
    function init() {
        console.log('init', moduleName);
    }
    function change() {
        console.log('change', moduleName);
    }
    return {
        change: change
    };
}();

let module_v4 = (function() {
    let moduleName = "module_v4";
    function init() {
        console.log('init', moduleName);
    }
    function change() {
        console.log('change', moduleName);
    }
    return {
        change: change
    };
})();

module_v1.init();
module_v1.change();

// module_v2.init(); // error
module_v2.change();

// module_v3.init(); // error
module_v3.change();

// module_v4.init(); // error
module_v4.change();
