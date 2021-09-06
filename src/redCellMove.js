import { gap, cellWidth } from './2048.js';
import { cellColorChange } from './new-cell-creation';

let redCellMoveLeft = function(redCellLine, allLines, n, l) {
    for (let i = 0; i < redCellLine.length; i++) {
        if (allLines[l][i] !== 0) {
            redCellLine[i].style.transition = '0.5s';
            redCellLine[i].id = i + n * l;
            redCellLine[i].style.top = gap + cellWidth * l + 'px';
            redCellLine[i].style.left = gap + cellWidth * i + 'px';
            cellColorChange(redCellLine[i], allLines[l][i]);
            let num = redCellLine[i].textContent;
            redCellLine[i].textContent = allLines[l][i];
        
            if(allLines[l][i] != num) {
                redCellLine[i].style.animation = 'show-big 0.5s 1';
            }
            
        } else {
            redCellLine[i].style.transition = '0.5s';
            redCellLine[i].id = i + n * l;
            redCellLine[i].style.top = gap + cellWidth * l + 'px';
            redCellLine[i].style.left = gap + cellWidth * i + 'px';
            //redCellLine[i - 1].style.animation = '';
            //redCellLine[i - 1].style.animation = 'show-big 0.5s 1';//
            redCellLine[i].remove();
        }
    }
};

let redCellMoveRight = function(redCellLine, allLines, n, l) {
    let k = 0;
                for (let i = redCellLine.length - 1; i >= 0; i--) {
                    let len = n - 1 - k;
                    if (allLines[l][len] !== 0) {
                        redCellLine[i].style.transition = '0.5s';
                        redCellLine[i].id = len + n * l;
                        redCellLine[i].style.top = gap + cellWidth * l + 'px';
                        redCellLine[i].style.left = gap + cellWidth * len + 'px';
                        redCellLine[i].textContent = allLines[l][len];
                        cellColorChange(redCellLine[i], allLines[l][len]);
                        k++;
                    } else {
                        redCellLine[i].style.transition = '0.5s';
                        redCellLine[i].id = len + n * l;
                        redCellLine[i].style.top = gap + cellWidth * l + 'px';
                        redCellLine[i].style.left = gap + cellWidth * len + 'px';
                        redCellLine[i + 1].style.animation = '';
                        redCellLine[i + 1].style.animation = 'show-big 0.5s 1';
                        redCellLine[i].remove();
                    }
                }
};

let redCellMoveUp = function(redCellColumn, allColumns, n, l) {
    for (let i = 0; i < redCellColumn.length; i++) {
        if (allColumns[l][i] !== 0) {
            redCellColumn[i].style.transition = '0.5s';
            redCellColumn[i].id = i * n + l;
            redCellColumn[i].style.top = gap + cellWidth * i + 'px';
            redCellColumn[i].style.left = gap + cellWidth * l + 'px';
            redCellColumn[i].textContent = allColumns[l][i];
            cellColorChange(redCellColumn[i], allColumns[l][i]);
        } else {
            redCellColumn[i].style.transition = '0.5s';
            redCellColumn[i].id = i * n + l;
            redCellColumn[i].style.top = gap + cellWidth * i + 'px';
            redCellColumn[i].style.left = gap + cellWidth * l + 'px';
            redCellColumn[i - 1].style.animation = '';
            redCellColumn[i - 1].style.animation = 'show-big 0.5s 1';
            redCellColumn[i].remove();
        }
    }
};

let redCellMoveDown = function(redCellColumn, allColumns, n, l) {
    let k = 0;
                for (let i = redCellColumn.length - 1; i >= 0; i--) {
                    let len = n - 1 - k;
                    if (allColumns[l][len] !== 0) {
                        redCellColumn[i].style.transition = '0.5s';
                        redCellColumn[i].id = len * n + l;
                        redCellColumn[i].style.top = gap + cellWidth * len + 'px';
                        redCellColumn[i].style.left = gap + cellWidth * l + 'px';
                        redCellColumn[i].textContent = allColumns[l][len];
                        cellColorChange(redCellColumn[i], allColumns[l][len]);
                        k++;
                    } else {
                        redCellColumn[i].style.transition = '0.5s';
                        redCellColumn[i].id = len * n + l;
                        redCellColumn[i].style.top = gap + cellWidth * len + 'px';
                        redCellColumn[i].style.left = gap + cellWidth * l + 'px';
                        redCellColumn[i + 1].style.animation = 'show-big 0.5s 1';
                        redCellColumn[i].remove();
                    }
                }
};
export {redCellMoveLeft, redCellMoveRight, redCellMoveUp, redCellMoveDown};