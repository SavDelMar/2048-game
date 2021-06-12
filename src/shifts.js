//Для алгритма движения
let score = 0;
let nullDelete = function (array) {
    return array.filter(cell => (parseInt(cell.number) > 0));
}
//алгоритм движения по всем направлениям
let shift = function (array, l) {
    let len = array.length;
    array = nullDelete(array);
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i].number == array[i + 1].number) {
            array[i].number = 2 * parseInt(array[i].number);
            score = score + parseInt(array[i].number);
            array[i].id = i + 4 * l;
            array[i + 1].number = '';
            array[i + 1].isFree = true;
            array[i + 1].id = i + 4 * l + 1;
        }
    }

    array = nullDelete(array);
    for (let i = 0; i < array.length; i++) {
        array[i].id = i + 4 * l;
        array[i].top = 5 + 62 * l;
        array[i].left = 5 + i * 62;
        array[i].isFree = false;

    }
    for (let i = 0; i < len; i++) {
        if (!array[i]) {
            array.push({
                top: 5 + 62 * l,
                left: 5 + i * 62,
                id: i + 4 * l,
                isFree: true,
                number: ''
            })

        }
    }

    return array;
}
let shiftRight = function (array, l) {
    let len = array.length;
    let k = 0;
    array = nullDelete(array);
    for (let i = array.length - 1; i > 0; i--) {
        if (array[i].number == array[i - 1].number) {
            array[i].number = 2 * parseInt(array[i].number);
            score = score + parseInt(array[i].number);
            array[i].id = i + 4 * l;
            array[i - 1].number = '';
            array[i - 1].isFree = true;
            array[i - 1].id = i + 4 * l - 1;
        }
    }
    array = nullDelete(array);
    for (let i = array.length - 1; i > -1; i--) {
        array[i].id = len - 1 - k + 4 * l;
        array[i].top = 5 + 62 * l;
        array[i].left = 5 + (len - 1 - k) * 62;
        array[i].isFree = false;
        k++;
    }
    array = array.reverse();
    for (let i = 0; i < len; i++) {
        if (!array[i]) {
            array.push({
                top: 5 + 62 * l,
                left: 5 + (len - 1 - i) * 62,
                id: len - 1 - i + 4 * l,
                isFree: true,
                number: ''
            })
        }
    }
    return array.reverse();
};
let shiftUp = function (array, l) {
    let len = array.length;
    array = nullDelete(array);
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i].number == array[i + 1].number) {
            array[i].number = 2 * parseInt(array[i].number);
            score = score + parseInt(array[i].number);
            array[i].id = i * 4 + l;            // 2 6 10 14
            array[i + 1].number = '';
            array[i + 1].isFree = true;
            array[i + 1].id = i * 4 + l + 4;
        }
    }
    array = nullDelete(array);
    for (let i = 0; i < array.length; i++) {
        array[i].id = i * 4 + l;
        array[i].top = 5 + 62 * i;
        array[i].left = 5 + l * 62;
        array[i].isFree = false;

    }
    for (let i = 0; i < len; i++) {
        if (!array[i]) {
            array.push({
                top: 5 + 62 * i,
                left: 5 + l * 62,
                id: i * 4 + l,
                isFree: true,
                number: ''
            })

        }
    }
    return array;
}
let shiftDown = function (array, l) {    //0 2 2 4
    let len = array.length;
    let k = 0;
    array = nullDelete(array);
    for (let i = array.length - 1; i > 0; i--) {
        if (array[i].number == array[i - 1].number) {
            array[i].number = 2 * parseInt(array[i].number);
            score = score + parseInt(array[i].number);
            array[i].id = i * 4 + l;
            array[i - 1].number = '';
            array[i - 1].isFree = true;
            array[i - 1].id = i * 4 + l - 4;
        }
    }
    array = nullDelete(array);
    for (let i = array.length - 1; i > -1; i--) {
        array[i].id = (len - 1 - k) * 4 + l;
        array[i].top = 5 + (len - 1 - k) * 62;
        array[i].left = 5 + 62 * l;
        array[i].isFree = false;
        k++;
    }
    array = array.reverse();
    for (let i = 0; i < len; i++) {
        if (!array[i]) {
            array.push({
                top: 5 + (len - 1 - i) * 62,
                left: 5 + 62 * l,
                id: (len - 1 - i) * 4 + l,
                isFree: true,
                number: ''
            })
        }
    }
    return array.reverse();
};
export {shift, shiftDown, shiftRight, shiftUp, score};