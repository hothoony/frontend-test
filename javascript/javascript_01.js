var moduleName = "NO moduleName";

var module_v1 = {
    moduleName: 'module_v1',
    init: function() {
        console.log('init', this.moduleName);
    },
    change: function() {
        console.log('change', this.moduleName);
    }
};

var module_v2 = function() {
    var moduleName = "module_v2";
    function init() {
        console.log('init', moduleName);
    }
    return {
        change: function() {
            console.log('change', moduleName);
        }
    };
}();

var module_v3 = function() {
    var moduleName = "module_v3";
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

var module_v4 = (function() {
    var moduleName = "module_v4";
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
