
let cellsData = [
    {
        top: 5,
        left: 5,
        id: 0,
        isFree: true,
        number: ''
    },
    {
        top: 5,
        left: 67,
        id: 1,
        isFree: true,
        number: ''
    },
    {
        top: 5,
        left: 129,
        id: 2,
        isFree: true,
        number: ''
    },
    {
        top: 5,
        left: 191,
        id: 3,
        isFree: true,
        number: ''
    },
    {
        top: 67,
        left: 5,
        id: 4,
        isFree: true,
        number: ''
    },
    {
        top: 67,
        left: 67,
        id: 5,
        isFree: true,
        number: ''
    },
    {
        top: 67,
        left: 129,
        id: 6,
        isFree: true,
        number: ''
    },
    {
        top: 67,
        left: 191,
        id: 7,
        isFree: true,
        number: ''
    },
    {
        top: 129,
        left: 5,
        id: 8,
        isFree: true,
        number: ''
    },
    {
        top: 129,
        left: 67,
        id: 9,
        isFree: true,
        number: ''
    },
    {
        top: 129,
        left: 129,
        id: 10,
        isFree: true,
        number: ''
    },
    {
        top: 129,
        left: 191,
        id: 11,
        isFree: true,
        number: ''
    },
    {
        top: 191,
        left: 5,
        id: 12,
        isFree: true,
        number: ''
    },
    {
        top: 191,
        left: 67,
        id: 13,
        isFree: true,
        number: ''
    },
    {
        top: 191,
        left: 129,
        id: 14,
        isFree: true,
        number: ''
    },
    {
        top: 191,
        left: 191,
        id: 15,
        isFree: true,
        number: ''
    }
];
let redCells = Array.from(document.querySelectorAll('.red-cell'));
let prevRedCells = [];
let newRedCells = [];
let isEqual = false;
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

let cellColorChange = function (cell, textNumber) {
    if (textNumber == 2) {
        cell.style.backgroundColor = 'rgb(237, 167, 114)'
    };
    if (textNumber == 4) {
        cell.style.backgroundColor = 'rgb(210, 143, 72)'
    };
    if (textNumber == 8) {
        cell.style.backgroundColor = 'rgb(190, 123, 72)'
    };
    if (textNumber == 16) {
        cell.style.backgroundColor = 'rgb(170, 103, 72)'
    };
    if (textNumber == 32) {
        cell.style.backgroundColor = 'rgb(150, 83, 50)'
    };
    if (textNumber == 64) {
        cell.style.backgroundColor = 'rgb(104, 53, 14)'
    };
    if (textNumber == 128) {
        cell.style.backgroundColor = 'rgb(104, 30, 10)'
    };
}
let nullDelete = function (array) {
    return array.filter(cell => (parseInt(cell.number) > 0));
}
let cleanField = function () {
    for (let i = 0; i < redCells.length; i++) {
        if (redCells[i].id !== 0) {
            document.getElementById(redCells[i].id).remove();
        }
    }
}
let score = 0;
let currentScore = document.getElementById('current-score');
currentScore.textContent = score;

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

let freeCells = cellsData.filter(cell => cell.isFree == true);
let gameField = document.getElementById('game-field');
let redCellTemplate = document.querySelector('#red-cell-template').content;
let newRedCellTemplate = redCellTemplate.querySelector('.red-cell');

let newGameButton = document.querySelector('.new-game');
let numbers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
let createNewRedCell = function (textNumber, current) {
    let newRedCell = newRedCellTemplate.cloneNode(true);
    newRedCell.textContent = textNumber;
    let currentCell = current;
    newRedCell.style.top = currentCell.top + 'px';
    newRedCell.style.left = currentCell.left + 'px';

    newRedCell.id = currentCell.id;
    currentCell.isFree = false;
    current.isFree = false;
    current.number = textNumber;
    currentCell.number = newRedCell.textContent;
    cellColorChange(newRedCell, textNumber);
    gameField.appendChild(newRedCell);
    freeCells = cellsData.filter(cell => cell.isFree == true);
    redCells = Array.from(document.querySelectorAll('.red-cell'));

    console.log(newRedCell.id);
}
/*let createNewLine = function (line) {
    for (let i = 0; i < line.length; i++) {
        if (line[i].number !== '') {
            createNewRedCell(line[i].number, line[i])
        }
    }

}*/
createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);

newGameButton.addEventListener('click', function () {
    for (let i = 0; i < redCells.length; i++) {
        cellsData[redCells[i].id].number = '';
        cellsData[redCells[i].id].isFree = true;
    }
    cleanField();
    freeCells = cellsData.filter(cell => cell.isFree == true);
    createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
    createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);

})


document.addEventListener('keydown', function (evt) {
    prevRedCells = [];
    for (i = 0; i < freeCells.length; i++) {
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
                    redCellLine[i].style.transition = '0.3s';
                    redCellLine[i].id = allLines[l][len].id;
                    redCellLine[i].style.top = allLines[l][len].top + 'px';
                    redCellLine[i].style.left = allLines[l][len].left + 'px';
                    redCellLine[i].textContent = allLines[l][len].number;
                    cellColorChange(redCellLine[i], allLines[l][len].number);
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
        updateALLData();
    }
    newRedCells = [];
    for (i = 0; i < freeCells.length; i++) {
        newRedCells.push(freeCells[i].id);
    }
    console.log(newRedCells)
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

    console.log(isEqual)
    currentScore.textContent = ' ' + score;
    if (!isEqual) {
        setTimeout(function () {
            createNewRedCell(numbers[Math.floor(Math.random() * numbers.length)], freeCells[Math.floor(Math.random() * freeCells.length)]);
        }, 400)
    }

})
