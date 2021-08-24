import './styles/2048.css';
import { cleanField } from './restart-game2048';
import { shift, score } from './shifts';
import { createNewRedCell, cellColorChange } from './new-cell-creation';
import {  cellsDataCreation, createColumnsArray, createLinesArray, n } from './state';
import { touchStartHandler, touchMoveHandler, touchEndHandler } from './mobile-events.js';

//Маcсив заполненных ячеек
let redCells = Array.from(document.querySelectorAll('.red-cell'));

let gameDrive;

let isMinGoal = false;
let cellWidth = 62;
let gap = 5;

//Создаем начальные данные

let cellsData = {
    cellsDataArray: [],
    set s (n) {                         // сеттер для установки актуальных значений массива
        const data = n.split(' ');
        this.cellsDataArray[data[0]] = parseInt(data[1]);
    }
}
cellsDataCreation(n, cellsData.cellsDataArray);
let allLines = [];
let allColumns = [];
createColumnsArray(n, cellsData.cellsDataArray, allColumns);
createLinesArray(n, cellsData.cellsDataArray, allLines);
//получаем массив свободных ячеек
let freeCells = [];
let createFreeCellsArray = function (array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == 0) {
            freeCells.push({
                id: i,
                isFree: true,
                top: Math.trunc(i / n) * cellWidth + gap,
                left: i % n * cellWidth + gap
            })
        }
    }
    return freeCells;
}
createFreeCellsArray(cellsData.cellsDataArray, freeCells);
let newGameButton = document.querySelector('.new-game');

//Массив для рандомного выбора номинала новой ячейки
let numbers = [ 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 8, 1024, 1024, 1024, 1024];

//Переменные для проверки изменения состояния поля
let prevRedCellsValues = [];
let prevRedCells = [];
let newRedCells = [];
let isEqual = false;

//Обновление всех данныхß
let updateALLData = function () {
    allLines = [];
    allColumns = [];
    createColumnsArray(n, cellsData.cellsDataArray, allColumns);
    createLinesArray(n, cellsData.cellsDataArray, allLines);
    freeCells = [];
    createFreeCellsArray(cellsData.cellsDataArray);
    redCells = Array.from(document.querySelectorAll('.red-cell'));
}

//Счет и шаги

let currentScore = document.getElementById('current-score');
currentScore.textContent = ' ' + score.value;
let stepsTotal = document.getElementById('steps');

let steps = 0;
stepsTotal.textContent = ' ' + steps;

//Создание начальных  2 рандомных игровых ячеек
createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
freeCells = [];
createFreeCellsArray(cellsData.cellsDataArray);
redCells = Array.from(document.querySelectorAll('.red-cell'));
createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
updateALLData();
redCells = Array.from(document.querySelectorAll('.red-cell'));

//Функционал Кнопки Новая игра
newGameButton.addEventListener('click', function () {
    document.querySelector('.game-win').style.display = 'none';
    document.querySelector('.game-over').style.display = 'none';
    redCells = Array.from(document.querySelectorAll('.red-cell'));
    for (let i = 0; i < redCells.length; i++) {    //очищаем state
        cellsData.cellsDataArray[redCells[i].id] = 0;
    }
    cleanField(redCells); //удаляем все игровые ячейкм
       cellsData.cellsDataArray = [];
       cellsDataCreation(n, cellsData.cellsDataArray);
       freeCells = [];
       createFreeCellsArray(cellsData.cellsDataArray);
    createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
       freeCells = [];
       createFreeCellsArray(cellsData.cellsDataArray);
    createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
        updateALLData();
        redCells = Array.from(document.querySelectorAll('.red-cell'));
    isMinGoal = false;
    currentScore.textContent = ' ' + '0';
    score.setScoreValue = 0;
    steps = 0;
    stepsTotal.textContent = ' ' + '0';

})

//Функционал Кнопки Продолжить
document.querySelector('.continue-button').addEventListener('click', function () {
    document.querySelector('.game-win').style.display = 'none';
})
//Функционал Кнопки Шаг назад
document.querySelector('.return').addEventListener('click', function () {
    document.querySelector('.game-win').style.display = 'none';
    document.querySelector('.game-over').style.display = 'none';
    console.log(prevRedCells, prevRedCellsValues);
    redCells = Array.from(document.querySelectorAll('.red-cell'));
    for (let i = 0; i < redCells.length; i++) {      //очищаем state
        cellsData.cellsDataArray[redCells[i].id] = 0;
    }
    cleanField(redCells);
    freeCells = [];
    createFreeCellsArray(cellsData.cellsDataArray);
    for (let i = 0; i < prevRedCells.length; i++) {
        createNewRedCell(prevRedCellsValues[i], cellsData[prevRedCells[i]])
    }
    freeCells = [];
    createFreeCellsArray(cellsData.cellsDataArray);
})

//Игровой механизм
// MOBILE
let field = document.getElementById('game-field');
field.addEventListener('touchstart', touchStartHandler);
field.addEventListener('touchmove', touchMoveHandler);
field.addEventListener('touchend', touchEndHandler);
gameDrive = function (direction) {
    prevRedCells = [];
    for (let i = 0; i < freeCells.length; i++) { //создаем массив начальных игровых ячеек
        prevRedCells.push(freeCells[i].id);
    }
    prevRedCellsValues = [];
    for (let i = 0; i < redCells.length; i++) { //создаем массив начальных игровых ячеек
        prevRedCellsValues.push(redCells[i].textContent);
    }
    if (direction == 'l') {
        for (let l = 0; l < allLines.length; l++) {
            allLines[l] = shift(allLines[l], l);
            let redCellLine = redCells.filter(cell => (cell.id < 4 * (l + 1) && cell.id >= 4 * l));
            redCellLine = redCellLine.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);

            for (let i = 0; i < redCellLine.length; i++) {
                if (allLines[l][i].number !== '') {
                    let prevNum = redCellLine[i].textContent;
                    redCellLine[i].style.transition = '0.9s';
                    redCellLine[i].id = allLines[l][i].id;
                    redCellLine[i].style.top = allLines[l][i].top + 'px';
                    redCellLine[i].style.left = allLines[l][i].left + 'px';
                    cellColorChange(redCellLine[i], allLines[l][i].number);
                    redCellLine[i].textContent = allLines[l][i].number;
                    if (allLines[l][i].number > prevNum) {
                        redCellLine[i].style.animation = '';
                        redCellLine[i].style.animation = 'show-big 0.5s 1';
                    }
                } else {
                    redCellLine[i].style.transition = '0.9s';
                    redCellLine[i].id = allLines[l][i].id;
                    redCellLine[i].style.top = allLines[l][i].top + 'px';
                    redCellLine[i].style.left = allLines[l][i].left + 'px';
                    redCellLine[i].remove();
                }
            }
            redCells = Array.from(document.querySelectorAll('.red-cell'));

            for (let i = 0; i < allLines[l].length; i++) {
                cellsData[i + 4 * l] = allLines[l][i]
            }
        }

    } else if (direction == 'r') {
        for (let l = 0; l < allLines.length; l++) {
            allLines[l] = shiftRight(allLines[l], l);
            let redCellLine = redCells.filter(cell => (cell.id < 4 * (l + 1) && cell.id >= 4 * l));
            redCellLine = redCellLine.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);
            let k = 0;
            for (let i = redCellLine.length - 1; i >= 0; i--) {
                let len = allLines[l].length - 1 - k;
                if (allLines[l][len].number !== '') {
                    let prevNum = redCellLine[i].textContent;
                    redCellLine[i].style.transition = '0.4s';
                    redCellLine[i].id = allLines[l][len].id;
                    redCellLine[i].style.top = allLines[l][len].top + 'px';
                    redCellLine[i].style.left = allLines[l][len].left + 'px';
                    redCellLine[i].textContent = allLines[l][len].number;
                    cellColorChange(redCellLine[i], allLines[l][len].number);
                    if (allLines[l][len].number !== prevNum) {
                        redCellLine[i].style.animation = '';
                        redCellLine[i].textContent = allLines[l][len].number;
                        redCellLine[i].style.animation = 'show-big 0.5s 1';
                    }
                    k++;
                } else {
                    redCellLine[i].style.transition = '0.9s';
                    redCellLine[i].id = allLines[l][len].id;
                    redCellLine[i].style.top = allLines[l][len + 1].top + 'px';
                    redCellLine[i].style.left = allLines[l][len + 1].left + 'px';
                    redCellLine[i].remove();
                }
            }
            redCells = Array.from(document.querySelectorAll('.red-cell'));
            for (let i = 0; i < allLines[l].length; i++) {
                cellsData[i + 4 * l] = allLines[l][i]
            }
        }

    } else if (direction == 'u') {
        for (let l = 0; l < allColumns.length; l++) {
            allColumns[l] = shiftUp(allColumns[l], l);
            let redCellColumn = redCells.filter(cell => (cell.id % 4 == l));
            redCellColumn = redCellColumn.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);
            for (let i = 0; i < redCellColumn.length; i++) {
                if (allColumns[l][i].number !== '') {
                    let prevNum = redCellColumn[i].textContent;
                    redCellColumn[i].style.transition = '0.9s';
                    redCellColumn[i].id = allColumns[l][i].id;
                    redCellColumn[i].style.top = allColumns[l][i].top + 'px';
                    redCellColumn[i].style.left = allColumns[l][i].left + 'px';
                    redCellColumn[i].textContent = allColumns[l][i].number;
                    cellColorChange(redCellColumn[i], allColumns[l][i].number);
                    if (allColumns[l][i].number !== prevNum) {
                        redCellColumn[i].style.animation = 'show-big 0.5s 1';
                        redCellColumn[i].textContent = allColumns[l][i].number;

                    }
                } else {
                    redCellColumn[i].style.transition = '0.9s';
                    redCellColumn[i].id = allColumns[l][i].id;
                    redCellColumn[i].style.top = allColumns[l][i].top + 'px';
                    redCellColumn[i].style.left = allColumns[l][i].left + 'px';
                    redCellColumn[i].remove();
                }
            }
            redCells = Array.from(document.querySelectorAll('.red-cell'));
            for (let i = 0; i < allColumns[l].length; i++) {
                cellsData[i * 4 + l] = allColumns[l][i];
            }
        }
    } else if (direction == 'd') {
        for (let l = 0; l < allColumns.length; l++) {
            allColumns[l] = shiftDown(allColumns[l], l);
            let redCellColumn = redCells.filter(cell => (cell.id % 4 == l));
            redCellColumn = redCellColumn.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);
            let k = 0;
            for (let i = redCellColumn.length - 1; i >= 0; i--) {
                let len = allColumns[l].length - 1 - k;
                if (allColumns[l][len].number !== '') {
                    let prevNum = redCellColumn[i].textContent;
                    redCellColumn[i].style.transition = '0.9s';
                    redCellColumn[i].id = allColumns[l][len].id;
                    redCellColumn[i].style.top = allColumns[l][len].top + 'px';
                    redCellColumn[i].style.left = allColumns[l][len].left + 'px';
                    redCellColumn[i].textContent = allColumns[l][len].number;
                    cellColorChange(redCellColumn[i], allColumns[l][len].number);
                    k++;
                    if (allColumns[l][len].number !== prevNum) {
                        redCellColumn[i].style.animation = '';
                        redCellColumn[i].textContent = allColumns[l][len].number;
                        redCellColumn[i].style.animation = 'show-big 0.5s 1';
                    }
                } else {
                    redCellColumn[i].style.transition = '0.9s';
                    redCellColumn[i].id = allColumns[l][len].id;
                    redCellColumn[i].style.top = allColumns[l][len].top + 'px';
                    redCellColumn[i].style.left = allColumns[l][len].left + 'px';
                    redCellColumn[i].remove();
                }
            }
            redCells = Array.from(document.querySelectorAll('.red-cell'));
            for (let i = 0; i < allColumns[l].length; i++) {
                cellsData[i * 4 + l] = allColumns[l][i];
            }

        }

    }
    updateALLData();
    newRedCells = [];
    for (let i = 0; i < freeCells.length; i++) {  //создаем массив конечных игровых ячеек
        newRedCells.push(freeCells[i].id);
    }
    console.log(newRedCells);

    //Сравнение состояний поля ДО и ПОСЛЕ
    if (newRedCells.length == prevRedCells.length) {
        isEqual = false
        let i = 0;
        while (newRedCells[i] == prevRedCells[i] && i < newRedCells.length) {
            isEqual = isEqual + true;
            i++
        }
        if (isEqual < prevRedCells.length) {
            isEqual = false;
        }
    } else {
        isEqual = false
    }

    console.log(isEqual);
    console.log(prevRedCells, newRedCells);
    debugger
    currentScore.textContent = ' ' + score.value;

    //Если состояние поля изменилось - создаем новую рандомную ячейку
    if (!isEqual) {
        setTimeout(() => {
            createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
            updateALLData();
        }, 300)


    }
    for (let i = 0; i < redCells.length; i++) {
        if (redCells[i].textContent == 2048 && isMinGoal == 1) {
            isMinGoal++;
            document.querySelector('.game-win').style.display = 'block';
        }
    }

}

// PC
document.addEventListener('keydown', function (evt) {
    updateALLData();
    console.log(redCells)
    //Для проверки в конце хода изменилось ли состояние поля
    prevRedCells = [];
    for (let i = 0; i < redCells.length; i++) { //создаем массив начальных игровых ячеек
        prevRedCells.push(redCells[i].id);
    }
    prevRedCellsValues = [];
    for (let i = 0; i < redCells.length; i++) { //создаем массив начальных игровых ячеек
        prevRedCellsValues.push(redCells[i].textContent);
    }

    let directionMove = '';
    if (evt.key === 'i' || evt.key === 'ArrowLeft') {
        directionMove = 'left'
    } else if (evt.key === 'p' || evt.key === 'ArrowRight') {
        directionMove = 'right'
    } else if (evt.key === 'o' || evt.key === 'ArrowUp') {
        directionMove = 'up'
    } else if (evt.key === 'l' || evt.key === 'ArrowDown') {
        directionMove = 'down'
    }

        for (let l = 0; l < n; l++) {
            //oбновляем данные поля
            if (directionMove == 'left' || directionMove == 'right'){
                allLines[l] = shift(allLines[l], n, directionMove);
                for(let i = 0; i < n; i++) {
                    cellsData.s = `${i + n * l} ${allLines[l][i]}`
                }
            } else {
                allColumns[l] = shift(allColumns[l], n, directionMove);
                for (let i = 0; i < n; i++) {
                    cellsData.s = `${i * n + l} ${allColumns[l][i]}`
                }
            }

            // создаем и сортируем массив игровых ячеек (по линиям и столбцам)
            let redCellLine = redCells.filter(cell => (cell.id < n * (l + 1) && cell.id >= n * l));
            redCellLine = redCellLine.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);
            let redCellColumn = redCells.filter(cell => (cell.id % n == l));
            redCellColumn = redCellColumn.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);

            //перемещаем игровые ячейки
            if (directionMove == 'left') {
                for (let i = 0; i < redCellLine.length; i++) {
                    if (allLines[l][i] !== 0) {
                        redCellLine[i].style.transition = '0.9s';
                        redCellLine[i].id = i + n * l;
                        redCellLine[i].style.top = gap + cellWidth * l + 'px';
                        redCellLine[i].style.left = gap + cellWidth * i + 'px';
                        cellColorChange(redCellLine[i], allLines[l][i]);
                        redCellLine[i].textContent = allLines[l][i];
                    } else {
                        redCellLine[i].style.transition = '0.9s';
                        redCellLine[i].id = i + n * l;
                        redCellLine[i].style.top = gap + cellWidth * l + 'px';
                        redCellLine[i].style.left = gap + cellWidth * i + 'px';
                        redCellLine[i - 1].style.animation = '';
                        redCellLine[i - 1].style.animation = 'show-big 0.5s 1';
                        redCellLine[i].remove();
                    }
                }
                // зачем я это делаla? redCells = Array.from(document.querySelectorAll('.red-cell'));
            } else if (directionMove == 'right') {
                let k = 0;
                for (let i = redCellLine.length - 1; i >= 0; i--) {
                    let len = n - 1 - k;
                    if (allLines[l][len] !== 0) {
                        redCellLine[i].style.transition = '0.9s';
                        redCellLine[i].id = len + n * l;
                        redCellLine[i].style.top = gap + cellWidth * l + 'px';
                        redCellLine[i].style.left = gap + cellWidth * len + 'px';
                        redCellLine[i].textContent = allLines[l][len];
                        cellColorChange(redCellLine[i], allLines[l][len]);
                        k++;
                    } else {
                        redCellLine[i].style.transition = '0.9s';
                        redCellLine[i].id = len + n * l;
                        redCellLine[i].style.top = gap + cellWidth * l + 'px';
                        redCellLine[i].style.left = gap + cellWidth * len + 'px';
                        redCellLine[i + 1].style.animation = '';
                        redCellLine[i + 1].style.animation = 'show-big 0.5s 1';
                        redCellLine[i].remove();
                    }
                }
            } else if (directionMove == 'up') {
                for (let i = 0; i < redCellColumn.length; i++) {
                    if (allColumns[l][i] !== 0) {
                        redCellColumn[i].style.transition = '0.9s';
                        redCellColumn[i].id = i * n + l;
                        redCellColumn[i].style.top = gap + cellWidth * i + 'px';
                        redCellColumn[i].style.left = gap + cellWidth * l + 'px';
                        redCellColumn[i].textContent = allColumns[l][i];
                        cellColorChange(redCellColumn[i], allColumns[l][i]);
                    } else {
                        redCellColumn[i].style.transition = '0.9s';
                        redCellColumn[i].id = i * n + l;
                        redCellColumn[i].style.top = gap + cellWidth * i + 'px';
                        redCellColumn[i].style.left = gap + cellWidth * l + 'px';
                        redCellColumn[i - 1].style.animation = 'show-big 0.5s 1';
                        redCellColumn[i].remove();
                    }
                }
            } else if (directionMove == 'down') {
                let k = 0;
                for (let i = redCellColumn.length - 1; i >= 0; i--) {
                    let len = n - 1 - k;
                    if (allColumns[l][len] !== 0) {
                        redCellColumn[i].style.transition = '0.9s';
                        redCellColumn[i].id = len * n + l;
                        redCellColumn[i].style.top = gap + cellWidth * len + 'px';
                        redCellColumn[i].style.left = gap + cellWidth * l + 'px';
                        redCellColumn[i].textContent = allColumns[l][len];
                        cellColorChange(redCellColumn[i], allColumns[l][len]);
                        k++;
                    } else {
                        redCellColumn[i].style.transition = '0.9s';
                        redCellColumn[i].id = len * n + l;
                        redCellColumn[i].style.top = gap + cellWidth * len + 'px';
                        redCellColumn[i].style.left = gap + cellWidth * l + 'px';
                        redCellColumn[i + 1].style.animation = 'show-big 0.5s 1';
                        redCellColumn[i].remove();
                    }
                }
            }
            updateALLData()
        }
    redCells = Array.from(document.querySelectorAll('.red-cell'));
    console.log('after transitions')
    console.log(redCells)
    console.log(cellsData)
    console.log(allLines, allColumns)
    console.log(freeCells)

    //обновляем значения счета и шагов
    currentScore.textContent = ' ' + score.value;

    //создаем массив конечных игровых ячеек для последующего сравнения с начальным
    newRedCells = [];
    for (let i = 0; i < redCells.length; i++) {
        newRedCells.push(redCells[i].id);
    }

    //Сравнение состояний поля ДО и ПОСЛЕ
    if (newRedCells.length == prevRedCells.length) {
        isEqual = false
        let i = 0;
        while (newRedCells[i] == prevRedCells[i] && i < newRedCells.length) {
            isEqual = isEqual + true;
            i++
        }
        if (isEqual < prevRedCells.length) {
            isEqual = false;
        }
    } else {
        isEqual = false
    }
    //  обновляем все данные, чтоб правильно выбрать свободную ячейку для новой игровой
    updateALLData();
    //Если состояние поля изменилось - создаем новую рандомную ячейку
    if (!isEqual) {
        setTimeout(() => {
            createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
            updateALLData();
            steps++;
            stepsTotal.textContent = ' ' + steps;
            console.log(redCells, cellsData, freeCells)
        }, 300)
    }

    //проверяем, достигнута ли минимальная цель 2048
    for (let i = 0; i < redCells.length; i++) {
        if (redCells[i].textContent == 2048 && isMinGoal == false) {
            isMinGoal = true;
            document.querySelector('.game-win').style.display = 'block';
        }
    }
})

export { freeCells, redCells, gameDrive, cellsData };
