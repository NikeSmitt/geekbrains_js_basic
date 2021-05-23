// Нарисовать пирамиду с 20 рядами с помощью console.log, как показано на рисунке:
// x
// xx
// xxx
// xxxx
// xxxxx


function drawPiramid(height) {
    if (height < 1) {
        return ''
    }
    const ch = 'x'
    const piramid = [ch]
    for (let i = 1; i < height; i++) {
        piramid.push(piramid[i - 1] + ch);
    }
    return piramid.join('\n')
}


console.log(drawPiramid(20));