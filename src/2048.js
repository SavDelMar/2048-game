import './styles/2048.css';
import {cleanField} from './restart-game2048';
import { shift, shiftDown, shiftRight, shiftUp, score } from './shifts';
import { createNewRedCell, cellColorChange } from './new-cell-creation';
import {cellsData} from './state';

//Маасив заполненных ячеек
let redCells = Array.from(document.querySelectorAll('.red-cell'));

//массив свободных ячеек
let freeCells = cellsData.filter(cell => cell.isFree == true);

let newGameButton = document.querySelector('.new-game');

//Массив для рандомного выбора номинала новой ячейки
let numbers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];

//Переменные для проверки изменения состояния поля
let prevRedCells = [];
let newRedCells = [];
let isEqual = false;

//Разбиваю  поле на линии и столбцы
let firstLine = cellsData.filter(cell => cell.id < 4);
let secondLine = cellsData.filter(cell => (cell.id >= 4 && cell.id < 8));
let thirdLine = cellsData.filter(cell => (cell.id >= 8 && cell.id < 12));
let fourthLine = cellsData.filter(cell => (cell.id >= 12 && cell.id <= 15));
let allLines = [firstLine, secondLine, thirdLine, fourthLine];
let firstColumn = cellsData.filter(cell => cell.id % 4 == 0);
let secondColumn = cellsData.filter(cell => (cell.id % 4 == 1));
let thirdColumn = cellsData.filter(cell => (cell.id % 4 == 2));
let fourthColumn = cellsData.filter(cell => (cell.id % 4 == 3));
let allColumns = [firstColumn, secondColumn, thirdColumn, fourthColumn];

//Обновление всех данных
let updateALLData = function () {
    freeCells = cellsData.filter(cell => cell.isFree == true);
    firstLine = cellsData.filter(cell => cell.id < 4);
    secondLine = cellsData.filter(cell => (cell.id >= 4 && cell.id < 8));
    thirdLine = cellsData.filter(cell => (cell.id >= 8 && cell.id < 12));
    fourthLine = cellsData.filter(cell => (cell.id >= 12 && cell.id <= 15));
    allLines = [firstLine, secondLine, thirdLine, fourthLine];
    firstColumn = cellsData.filter(cell => cell.id % 4 == 0);
    secondColumn = cellsData.filter(cell => (cell.id % 4 == 1));
    thirdColumn = cellsData.filter(cell => (cell.id % 4 == 2));
    fourthColumn = cellsData.filter(cell => (cell.id % 4 == 3));
    allColumns = [firstColumn, secondColumn, thirdColumn, fourthColumn];
}

//Счет
let currentScore = document.getElementById('current-score');
currentScore.textContent = ' ' + score;

//СОздание начальных рандомных игровых ячеек
createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);

//Функционал Кнопки Новая игра
newGameButton.addEventListener('click', function () {
    document.querySelector('.game-over').style.display = 'none';
    redCells = Array.from(document.querySelectorAll('.red-cell'));
    for (let i = 0; i < redCells.length; i++) {      //очищаем state
        cellsData[redCells[i].id].number = '';
        cellsData[redCells[i].id].isFree = true;
    }
    cleanField(redCells);
    console.log(freeCells)
    freeCells = cellsData.filter(cell => cell.isFree == true);
    createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
    freeCells = cellsData.filter(cell => cell.isFree == true);
    redCells = Array.from(document.querySelectorAll('.red-cell'));
    createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
    freeCells = cellsData.filter(cell => cell.isFree == true);
    redCells = Array.from(document.querySelectorAll('.red-cell'));

})

//Игровой механизм
document.addEventListener('keydown', function (evt) {
    prevRedCells = [];
    for ( let i = 0; i < freeCells.length; i++) { //создаем массив начальных игровых ячеек
        prevRedCells.push(freeCells[i].id);
    }
    console.log(prevRedCells);

    if (evt.key === 'i') {
        for (let l = 0; l < allLines.length; l++) {
            allLines[l] = shift(allLines[l], l);
            let redCellLine = redCells.filter(cell => (cell.id < 4 * (l + 1) && cell.id >= 4 * l));
            redCellLine = redCellLine.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);

            for (let i = 0; i < redCellLine.length; i++) {
                if (allLines[l][i].number !== '') {
                    let prevNum = redCellLine[i].textContent;
                    redCellLine[i].style.transition = '0.3s';
                    redCellLine[i].id = allLines[l][i].id;
                    redCellLine[i].style.top = allLines[l][i].top + 'px';
                    redCellLine[i].style.left = allLines[l][i].left + 'px';
                    
                    cellColorChange(redCellLine[i], allLines[l][i].number);
                    if (allLines[l][i].number > prevNum) {
                        
                        redCellLine[i].style.animation = '';
                        setTimeout(function () {
                            redCellLine[i].textContent = allLines[l][i].number;
                            redCellLine[i].style.animation = 'show-big 0.5s 1';
                        }, 250);
                    }
                } else {
                    redCellLine[i].style.transition = '0.3s';
                    redCellLine[i].id = allLines[l][i].id;
                    redCellLine[i].style.top = allLines[l][i].top + 'px';
                    redCellLine[i].style.left = allLines[l][i].left + 'px';
                    redCellLine[i].style.top = redCellLine[i].style.top + 20 + 'px';
                    redCellLine[i].style.left = redCellLine[i].style.left + 20 + 'px';
                    setTimeout(function () { redCellLine[i].remove() }, 300);
                }
            }
            redCells = Array.from(document.querySelectorAll('.red-cell'));

            for (let i = 0; i < allLines[l].length; i++) {
                cellsData[i + 4 * l] = allLines[l][i]
            }
        }

        updateALLData();
    }
    if (evt.key === 'p') {
        for (let l = 0; l < allLines.length; l++) {
            allLines[l] = shiftRight(allLines[l], l);
            let redCellLine = redCells.filter(cell => (cell.id < 4 * (l + 1) && cell.id >= 4 * l));
            redCellLine = redCellLine.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);
            let k = 0;
            for (let i = redCellLine.length - 1; i >= 0; i--) {
                let len = allLines[l].length - 1 - k;
                if (allLines[l][len].number !== '') {
                    let prevNum = redCellLine[i].textContent;
                    redCellLine[i].style.transition = '0.3s';
                    redCellLine[i].id = allLines[l][len].id;
                    redCellLine[i].style.top = allLines[l][len].top + 'px';
                    redCellLine[i].style.left = allLines[l][len].left + 'px';
                    redCellLine[i].textContent = allLines[l][len].number;
                    cellColorChange(redCellLine[i], allLines[l][len].number);
                    if (allLines[l][len].number > prevNum) {

                        redCellLine[i].style.animation = '';
                        setTimeout(function () {
                            redCellLine[i].textContent = allLines[l][len].number;
                            redCellLine[i].style.animation = 'show-big 0.5s 1';
                        }, 250);
                    }
                    k++;
                } else {
                    redCellLine[i].style.transition = '0.3s';
                    redCellLine[i].id = allLines[l][len].id;
                    redCellLine[i].style.top = allLines[l][len + 1].top + 'px';
                    redCellLine[i].style.left = allLines[l][len + 1].left + 'px';
                    setTimeout(function () { redCellLine[i].remove() }, 200);
                }
            }
            redCells = Array.from(document.querySelectorAll('.red-cell'));
            for (let i = 0; i < allLines[l].length; i++) {
                cellsData[i + 4 * l] = allLines[l][i]
            }
        }
        updateALLData();
    }

    if (evt.key === 'o') {
        for (let l = 0; l < allColumns.length; l++) {
            allColumns[l] = shiftUp(allColumns[l], l);
            let redCellColumn = redCells.filter(cell => (cell.id % 4 == l));
            redCellColumn = redCellColumn.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);
            for (let i = 0; i < redCellColumn.length; i++) {
                if (allColumns[l][i].number !== '') {
                    redCellColumn[i].style.transition = '0.3s';
                    redCellColumn[i].id = allColumns[l][i].id;
                    redCellColumn[i].style.top = allColumns[l][i].top + 'px';
                    redCellColumn[i].style.left = allColumns[l][i].left + 'px';
                    redCellColumn[i].textContent = allColumns[l][i].number;
                    cellColorChange(redCellColumn[i], allColumns[l][i].number);
                } else {
                    redCellColumn[i].style.transition = '0.2s';
                    redCellColumn[i].id = allColumns[l][i].id;
                    redCellColumn[i].style.top = allColumns[l][i].top + 'px';
                    redCellColumn[i].style.left = allColumns[l][i].left + 'px';
                    setTimeout(function () { redCellColumn[i].remove() }, 100);
                }
            }
            redCells = Array.from(document.querySelectorAll('.red-cell'));
            for (let i = 0; i < allColumns[l].length; i++) {
                cellsData[i * 4 + l] = allColumns[l][i];
            }
        }
        updateALLData();
    }
    if (evt.key === 'l') {
        for (let l = 0; l < allColumns.length; l++) {
            
            allColumns[l] = shiftDown(allColumns[l], l);
            let redCellColumn = redCells.filter(cell => (cell.id % 4 == l));
            redCellColumn = redCellColumn.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : -1);
            let k = 0;
            for (let i = redCellColumn.length - 1; i >= 0; i--) {
                let len = allColumns[l].length - 1 - k;
                if (allColumns[l][len].number !== '') {
                    redCellColumn[i].style.transition = '0.3s';
                    redCellColumn[i].id = allColumns[l][len].id;
                    redCellColumn[i].style.top = allColumns[l][len].top + 'px';
                    redCellColumn[i].style.left = allColumns[l][len].left + 'px';
                    redCellColumn[i].textContent = allColumns[l][len].number;
                    cellColorChange(redCellColumn[i], allColumns[l][len].number);
                    k++;
                } else {
                    redCellColumn[i].style.transition = '0.2s';
                    redCellColumn[i].id = allColumns[l][len].id;
                    redCellColumn[i].style.top = allColumns[l][len].top + 'px';
                    redCellColumn[i].style.left = allColumns[l][len].left + 'px';
                    setTimeout(function () { redCellColumn[i].remove() }, 100);
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
    console.log(newRedCells)

    //Сравнение состояний поля ДО и ПОСЛЕ
    if (newRedCells.length == prevRedCells.length) {
        isEqual = false
        let i = 0;
        while (newRedCells[i] == prevRedCells[i] && i<newRedCells.length) {
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

    currentScore.textContent = ' ' + score;
    //Если состояние поля изменилось - создаем новую рандомную ячейку
    
    if (!isEqual) {
        setTimeout(function () {
            createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
        }, 400)
    }
    
    setTimeout(()=>{
        updateALLData();
        console.log('Свободные ячейки:', freeCells);
        if (!freeCells && isEqual) {
            document.querySelector('.game-over').style.display = 'block';
        }
    }, 500)
    

})

export {freeCells, redCells};
