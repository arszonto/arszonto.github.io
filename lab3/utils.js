function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomColor() {
    const r = getRandomArbitrary(0, 255);
    const g = getRandomArbitrary(0, 255);
    const b = getRandomArbitrary(0, 255);
    const alpha = 1.0;
    return 'rgba(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ',' + alpha.toString() + ')'
}
