
const n = 4;
//создаю исходное поле
let cellsData = [];
let cellsDataCreation = function(n) {
    for (let i = 0; i < n*n; i++) {
        cellsData.push(0)
    }
    return cellsData;
}

//Разбиваю  поле на линии и столбцы
let allLines = [];
let allColumns = [];

let createLinesArray = function(n) {    
    for(let k = 0; k < n*n; k+=n) {
        let line = [];
        for(let i = k; i < k + n; i++) {
            line.push(cellsData[i]);
        }
        allLines.push(line);
    }
    return allLines;
}
createLinesArray(n);

let createColumnsArray = function (n) {
    for (let k = 0; k < n; k++) {
        let column = [];
        for (let i = k; i < k + n*n; i+=n) {
            column.push(cellsData[i]);
        }
        allColumns.push(column);
    }
    return allColumns;
}
createColumnsArray(n);

export {cellsData, allLines, allColumns, n};