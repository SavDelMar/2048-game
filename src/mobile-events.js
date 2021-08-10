import { gameDrive } from './2048';
// мобильная версия упрaвления свайпами
let xStart = 0;
let yStart = 0;
let xMove = 0;
let yMove = 0;
let direction = '';

let touchStartHandler = function (e) {
    xStart = e.touches[0].clientX;
    yStart = e.touches[0].clientY;
};

let touchMoveHandler = function (e) {
    xMove = e.changedTouches[0].clientX;
    yMove = e.changedTouches[0].clientY;
    
};

let touchEndHandler = function (e) {
    
    if (Math.abs(xMove - xStart) > Math.abs(yMove - yStart)) {
        if (xMove - xStart > 0) {
            direction = 'r';
        } else {
            direction = 'l';

        }
    } else {
        if (yMove - yStart > 0) {
            direction = 'd';
        } else {
            direction = 'u';
        }
    }
        gameDrive(direction)
   
};
export { touchStartHandler, touchMoveHandler, touchEndHandler };

