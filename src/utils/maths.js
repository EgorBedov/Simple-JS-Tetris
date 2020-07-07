export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getArrayOfZeros(len) {
    return new Array(len).fill(0);
}

/**
 * @param how {'ls' | 'ge' | 'gr'}
 */
export function compFunc(how, a, b) {
    switch (how) {
        case "ls":
            return a < b;
        case "ge":
            return a >= b;
        case "gr":
            return a > b;
    }
}

/**
 * @param array {{row: number, column: number}[]}
 * @param canvas {[[number]]}
 * @param index {number}
 * @param where {'left' | 'right' | 'down'}
 */
export function getBorders(array, canvas, index, where) {
    let boundary, compare;
    switch (where) {
        case "down":
            return array.filter(coord => canvas[coord.row + 1][coord.column] !== index);
        case "right":
            boundary = array.length - 1;
            compare = 'gr';
            break;
        case "left":
            boundary = 0;
            compare = 'ls';
            break;
    }
    let borders = [];
    let max = array[boundary].column;
    array.forEach(coord => {
        let {column} = coord;
        if (compFunc(compare, column, max)) {
            max = column;
            borders = [coord];
        } else if (column === max) {
            borders.push(coord);
        }
    });
    return borders;
}
