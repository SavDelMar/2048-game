
const n = 4;
//создаю исходное поле
let cellsDataCreation = function(n, array) {
    for (let i = 0; i < n*n; i++) {
        array.push(0)
    }
    return array;
}

//Разбиваю  поле на линии и столбцы


let createLinesArray = function(n, array, linesArray) {
    for (let k = 0; k < n * n; k += n) {
        let line = [];
        for(let i = k; i < k + n; i++) {
            line.push(array[i]);
        }
        linesArray.push(line);
    }
    return linesArray;
}

let createColumnsArray = function (n, array, columnsArray) {
    for (let k = 0; k < n; k++) {
        let column = [];
        for (let i = k; i < k + n*n; i+=n) {
            column.push(array[i]);
        }
        columnsArray.push(column);
    }
    return columnsArray;
}

export { cellsDataCreation, createColumnsArray, createLinesArray, n};
