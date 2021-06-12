//Создание новой игровой ячейки
import { cellsData } from './state';
import {freeCells, redCells} from './2048';
let gameField = document.getElementById('game-field');
let redCellTemplate = document.querySelector('#red-cell-template').content;
let newRedCellTemplate = redCellTemplate.querySelector('.red-cell');

//Изменение цвета ячейки при смене номинала. надо добавить LESS и больше 128

let cellColorChange = function (cell, textNumber) {
    if (textNumber == 2) {
        cell.style.backgroundColor = 'rgb(237, 167, 114)'
    } else if (textNumber == 4) {
        cell.style.backgroundColor = 'rgb(210, 143, 72)'
    } else if (textNumber == 8) {
        cell.style.backgroundColor = 'rgb(190, 123, 72)'
    } else if (textNumber == 16) {
        cell.style.backgroundColor = 'rgb(170, 103, 72)'
    } else if (textNumber == 32) {
        cell.style.backgroundColor = 'rgb(150, 83, 50)'
    } else if (textNumber == 64) {
        cell.style.backgroundColor = 'rgb(104, 53, 14)'
    } else if (textNumber == 128) {
        cell.style.backgroundColor = 'rgb(104, 30, 10)';
        cell.style.fontSize = '30px';
    } else if (textNumber == 258) {
        cell.style.backgroundColor = 'rgb(95, 20, 10)';
        cell.style.fontSize = '30px';
    } else if (textNumber == 512) {
        cell.style.backgroundColor = 'rgb(80, 20, 10)';
        cell.style.fontSize = '30px';
    } else if (textNumber == 1024) {
        cell.style.backgroundColor = 'rgb(60, 15, 10)';
        cell.style.fontSize = '30px';
    } else if (textNumber == 2048) {
        cell.style.backgroundColor = 'rgb(50, 5, 5)';
        cell.style.fontSize = '30px';
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