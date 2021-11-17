var moduleName = "NO moduleName";

(function() {
    var moduleName = "module name";
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

// init();
change();
