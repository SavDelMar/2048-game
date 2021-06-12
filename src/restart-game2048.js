const cleanField = function (redCells) {
    for (let i = 0; i < redCells.length; i++) {
        if (redCells[i].id !== 0) {
            document.getElementById(redCells[i].id).remove();
        }
    }
}
export {cleanField};