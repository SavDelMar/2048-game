import './styles/2048.css';
import { cleanField } from './restart-game2048';
import { shift, score } from './shifts';
import { createNewRedCell } from './new-cell-creation';
import { cellsDataCreation, createColumnsArray, createLinesArray, n } from './state';
import { touchStartHandler, touchMoveHandler, touchEndHandler } from './mobile-events.js';
import { redCellMoveLeft, redCellMoveRight, redCellMoveUp, redCellMoveDown } from './redCellMove.js';
import { Result } from './results';
import { bestScoreShow, openAllResults, openMyResults } from './show-results';

// просмотр моих результатов
document.getElementById('my-results').addEventListener('click', openMyResults);
//просмотр всех результатов
document.getElementById('all-results').addEventListener('click', openAllResults);

//Маcсив заполненных ячеек
let redCells = Array.from(document.querySelectorAll('.red-cell'));
let gameDrive;
let isMinGoal = false;
let cellWidth = 62;
let gap = 5;

//Создаем начальное поле, массив линий и столбцов
let cellsData = {
    cellsDataArray: [],
    set s(n) {                         // сеттер для установки актуальных значений массива
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


//Массив для рандомного выбора номинала новой ячейки
let numbers = [2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 8];

//Переменные для проверки изменения состояния поля
let prevRedCellsValues = [];
let prevRedCells = [];
let newRedCells = [];
let prevScore;
let isEqual = false;

//Обновление всех данных
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
let bestScore = document.getElementById('best-score');
bestScoreShow(bestScore);
//Создание начальных  2 рандомных игровых ячеек
createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
freeCells = [];
createFreeCellsArray(cellsData.cellsDataArray);
redCells = Array.from(document.querySelectorAll('.red-cell'));
createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
updateALLData();
redCells = Array.from(document.querySelectorAll('.red-cell'));

//Функционал Кнопки Новая игра
let newGameButton = document.querySelector('.new-game');
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
//Отправка данных в турнирную таблицу
window.addEventListener('load', Result.renderList)
document.querySelector('.send-button').addEventListener('click', function (e) {
    e.preventDefault();
    let name = document.querySelector('.user-name').value;
    if (name) {
        const userResult = {
            user: name,
            res: score.value,
            date: new Date().toJSON()
        }
        Result.create(userResult).then(() => {
            document.querySelector('.user-name').value = '';
        })
    }
})

//Функционал Кнопки Продолжить
document.querySelector('.continue-button').addEventListener('click', function () {
    document.querySelector('.game-win').style.display = 'none';
})
//Функционал Кнопки Шаг назад
document.querySelector('.return').addEventListener('click', function () {
    document.querySelector('.game-win').style.display = 'none';
    document.querySelector('.game-over').style.display = 'none';
    redCells = Array.from(document.querySelectorAll('.red-cell'));
    for (let i = 0; i < redCells.length; i++) {      //очищаем state
        cellsData.cellsDataArray[redCells[i].id] = 0;
    }
    cleanField(redCells);
    freeCells = [];
    createFreeCellsArray(cellsData.cellsDataArray);
    for (let i = 0; i < prevRedCells.length; i++) {
        createNewRedCell(prevRedCellsValues[i], freeCells[prevRedCells[i]])
    }
    freeCells = [];
    createFreeCellsArray(cellsData.cellsDataArray);
    score.setScoreValue = prevScore;
    currentScore.textContent = ' ' + parseInt(prevScore);
})

//Игровой механизм
// MOBILE
let field = document.getElementById('game-field');
field.addEventListener('touchstart', touchStartHandler);
field.addEventListener('touchmove', touchMoveHandler);
field.addEventListener('touchend', touchEndHandler);
gameDrive = function (direction) {
    updateALLData();
    //Для проверки в конце хода изменилось ли состояние поля
    prevRedCells = [];
    for (let i = 0; i < redCells.length; i++) { //создаем массив начальных игровых ячеек
        prevRedCells.push(redCells[i].id);
    }
    prevRedCellsValues = [];
    for (let i = 0; i < redCells.length; i++) { //создаем массив начальных игровых ячеек
        prevRedCellsValues.push(redCells[i].textContent);
    }
    prevScore = score.value;

    for (let l = 0; l < n; l++) {
        if (direction == 'left' || direction == 'right') {
            allLines[l] = shift(allLines[l], n, direction);
            for (let i = 0; i < n; i++) {
                cellsData.s = `${i + n * l} ${allLines[l][i]}`
            }
        } else {
            allColumns[l] = shift(allColumns[l], n, direction);
            for (let i = 0; i < n; i++) {
                cellsData.s = `${i * n + l} ${allColumns[l][i]}`
            }
        }

        // создаем и сортируем массивы игровых ячеек (по линиям и столбцам)
        let redCellLine = redCells.filter(cell => (cell.id < n * (l + 1) && cell.id >= n * l));
        redCellLine = redCellLine.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);
        let redCellColumn = redCells.filter(cell => (cell.id % n == l));
        redCellColumn = redCellColumn.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);

        if (direction == 'left') {
            redCellMoveLeft(redCellLine, allLines, n, l)
        } else if (direction == 'right') {
            redCellMoveRight(redCellLine, allLines, n, l)
        } else if (direction == 'up') {
            redCellMoveUp(redCellColumn, allColumns, n, l)
        } else if (direction == 'down') {
            redCellMoveDown(redCellColumn, allColumns, n, l)
        }
    }
    redCells = Array.from(document.querySelectorAll('.red-cell'));

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
        }, 400)
    }
    //проверяем, достигнута ли минимальная цель 2048
    for (let i = 0; i < redCells.length; i++) {
        if (redCells[i].textContent == 2048 && isMinGoal == false) {
            isMinGoal = true;
            document.querySelector('.game-win').style.display = 'block';
        }
    }
}

// PC
document.addEventListener('keydown', function (evt) {
    updateALLData();
    //Для проверки в конце хода изменилось ли состояние поля
    prevRedCells = [];
    for (let i = 0; i < redCells.length; i++) { //создаем массив начальных игровых ячеек
        prevRedCells.push(redCells[i].id);
    }
    prevRedCellsValues = [];
    for (let i = 0; i < redCells.length; i++) { //создаем массив начальных игровых ячеек
        prevRedCellsValues.push(redCells[i].textContent);
    }
    prevScore = score.value;

    let directionMove = '';
    if (evt.key === 'ArrowLeft') {
        directionMove = 'left'
    } else if ( evt.key === 'ArrowRight') {
        directionMove = 'right'
    } else if ( evt.key === 'ArrowUp') {
        directionMove = 'up'
    } else if (evt.key === 'ArrowDown') {
        directionMove = 'down'
    }

    for (let l = 0; l < n; l++) {
        //oбновляем данные поля
        if (directionMove == 'left' || directionMove == 'right') {
            allLines[l] = shift(allLines[l], n, directionMove);
            for (let i = 0; i < n; i++) {
                cellsData.s = `${i + n * l} ${allLines[l][i]}`
            }
        } else {
            allColumns[l] = shift(allColumns[l], n, directionMove);
            for (let i = 0; i < n; i++) {
                cellsData.s = `${i * n + l} ${allColumns[l][i]}`
            }
        }

        // создаем и сортируем массивы игровых ячеек (по линиям и столбцам)
        let redCellLine = redCells.filter(cell => (cell.id < n * (l + 1) && cell.id >= n * l));
        redCellLine = redCellLine.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);
        let redCellColumn = redCells.filter(cell => (cell.id % n == l));
        redCellColumn = redCellColumn.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);

        //перемещаем игровые ячейки
        if (directionMove == 'left') {
            redCellMoveLeft(redCellLine, allLines, n, l);
        } else if (directionMove == 'right') {
            redCellMoveRight(redCellLine, allLines, n, l);
        } else if (directionMove == 'up') {
            redCellMoveUp(redCellColumn, allColumns, n, l);
        } else if (directionMove == 'down') {
            redCellMoveDown(redCellColumn, allColumns, n, l);
        }
        updateALLData()
    }
    redCells = Array.from(document.querySelectorAll('.red-cell'));

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
        }, 400)
    }
    //проверяем, достигнута ли минимальная цель 2048
    for (let i = 0; i < redCells.length; i++) {
        if (redCells[i].textContent == 2048 && isMinGoal == false) {
            isMinGoal = true;
            document.querySelector('.game-win').style.display = 'block';
        }
    }
})

export { freeCells, redCells, gameDrive, cellsData, gap, cellWidth };
