(function() {
    const data = [
        null,
        undefined,
        '',
        ' ',
        'abc',
        '123',
        456,
        {},
        [],
        new String(),
        new Number(),
        new Date(),
        arguments,
    ];

    for (let i of data) {
        console.log(toString.call(i), '\t', i);
    }
})();
