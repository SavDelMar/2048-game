//Создание новой игровой ячейки
import { cellsData } from './state';
import {freeCells, redCells} from './2048';
let gameField = document.getElementById('game-field');
let redCellTemplate = document.querySelector('#red-cell-template').content;
let newRedCellTemplate = redCellTemplate.querySelector('.red-cell');

//Изменение цвета ячейки при смене номинала. надо добавить LESS и больше 128

let cellColorChange = function (cell, textNumber) {
    if (textNumber == 2) {
        cell.style.fontSize = '40px';
        cell.style.backgroundColor = 'rgb(237, 167, 114)'
    } else if (textNumber == 4) {
        cell.style.fontSize = '40px';
        cell.style.backgroundColor = 'rgb(210, 143, 72)'
    } else if (textNumber == 8) {
        cell.style.fontSize = '40px';
        cell.style.backgroundColor = 'rgb(190, 123, 72)'
    } else if (textNumber == 16) {
        cell.style.fontSize = '40px';
        cell.style.backgroundColor = 'rgb(170, 103, 72)'
    } else if (textNumber == 32) {
        cell.style.fontSize = '40px';
        cell.style.backgroundColor = 'rgb(150, 83, 50)'
    } else if (textNumber == 64) {
        cell.style.fontSize = '40px';
        cell.style.backgroundColor = 'rgb(104, 93, 14)'
    } else if (textNumber == 128) {
        cell.style.backgroundColor = 'rgb(115, 100, 10)';
        cell.style.fontSize = '30px';
    } else if (textNumber == 256) {
        cell.style.backgroundColor = 'rgb(120, 110, 10)';
        cell.style.fontSize = '30px';
    } else if (textNumber == 512) {
        cell.style.backgroundColor = 'rgb(130, 130, 10)';
        cell.style.fontSize = '30px';
    } else if (textNumber == 1024) {
        cell.style.backgroundColor = 'rgb(140, 150, 10)';
        cell.style.fontSize = '20px';
    } else if (textNumber == 2048) {
        cell.style.backgroundColor = 'rgb(150, 170, 5)';
        cell.style.fontSize = '20px';
        document.querySelector('.game-win').style.display = 'block';
    }
}

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
   /* freeCells = cellsData.filter(cell => cell.isFree == true);
    redCells = Array.from(document.querySelectorAll('.red-cell'));*/
    console.log(newRedCell.id);

}
export {createNewRedCell, cellColorChange};