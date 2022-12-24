(function() {
    const data = [
        null,                   // [object Null]
        undefined,              // [object Undefined]
        '',                     // [object String]
        ' ',                    // [object String]
        'abc',                  // [object String]
        '123',                  // [object String]
        456,                    // [object Number]
        {},                     // [object Object]
        [],                     // [object Array]
        new String(),           // [object String]
        new Number(),           // [object Number]
        new Date(),             // [object Date]
        new Boolean(),          // [object Boolean]
        arguments,              // [object Arguments]
        NaN,                    // [object Number]
        true,                   // [object Boolean]
        false,                  // [object Boolean]
        new Object(),           // [object Object]
        (() => {}),             // [object Function]
        (function() {}),        // [object Function]
        (function() {}()),      // [object Undefined]
        (function() {})(),      // [object Undefined]
        new Error(),            // [object Error]
    ];

    for (let i of data) {
        console.log(toString.call(i), '\t', i);
    }
})();
