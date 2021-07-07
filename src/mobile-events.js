import { gameDrive } from './2048';
// мобильная версия упрвления свайпами
let xStart = 0;
let yStart = 0;
let direction = '';

let touchStartHandler = function (e) {
    xStart = e.touches[0].clientX;
    yStart = e.touches[0].clientY;
};

let touchMoveHandler = function (e) {
    let xMove = e.changedTouches[0].clientX;
    let yMove = e.changedTouches[0].clientY;
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
    setTimeout(
        gameDrive(direction)
    , 500)
};

export { touchStartHandler, touchMoveHandler };

