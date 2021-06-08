if (!("a" in window)) {
    var a = 1;
}
alert(a);

// undefined

var b = function a(x) {
    x && a(--x);
};
alert(a);

// ошибка
//
function a(x) {
    return x * 2;
}
var a;
alert(a);

// undefined
//

function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);

// 10
//

function a() {
    alert(this);
}
a.call(null);

// прочитал на MDN, что call с null и undefined заменит их на глобальный объект
// window object
