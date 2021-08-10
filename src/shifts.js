
let score = 0;
let nullDelete = function (array) {
    return array.filter(cell => cell > 0);
}
//алгоритм движения по всем направлениям
let shift = function (array, n, direction) {
    if (direction == 'right' || direction == 'down') {
        array = array.reverse();
    }
    array = nullDelete(array);
    for (let i = 0; i < n - 1; i++) {
        if (array[i] == array[i + 1]) {
            array[i] = 2 * parseInt(array[i]);
            score = score + parseInt(array[i]);
            array[i+1] = 0;
        }
    }

    array = nullDelete(array);

    for (let i = 0; i < n; i++) {
        if (!array[i]) { 
            array.push(0)
        }
    }

    if (direction == 'right' || direction == 'down') {
        array = array.reverse();
    }

    return array;
}

export {shift, score};