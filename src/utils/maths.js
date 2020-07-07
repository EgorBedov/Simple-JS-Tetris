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
 * @param table {number[][]}
 * @param row {number}
 */
export function bodyEmptyFrom(row, table) {
    let empty = true;

    for (let iii = row; iii > 0; iii--) {
        empty = table[iii].every(cell => cell === 0);
        if (!empty) {
            return empty;
        }
    }

    return empty;
}

/**
 * @param obj {{place: number[][], index: number}}
 * @param canvas {[[number]]}
 * @param where {'left' | 'right' | 'down'}
 * @return {number[]}
 */
export function getBordersNew(obj, canvas, where) {
    /**
     * @type {Map<number, {row: number, column: number}[]>}
     */
    let axis = new Map();
    let mainAxis, subAxis, compare;

    switch (where) {
        case "down":
            mainAxis = 'column';
            subAxis = 'row';
            compare = 'ge';
            break;
        case "right":
            mainAxis = 'row';
            subAxis = 'column';
            compare = 'ge';
            break;
        case "left":
            mainAxis = 'row';
            subAxis = 'column';
            compare = 'ls';
            break;
        default:
            throw new Error('Incorrect argument >where<');
    }

    // Split into arrays of rows or columns
    obj.place.forEach(coord => {
        if (axis.has(coord[mainAxis])) {
            let prevArray = axis.get(coord[mainAxis]);
            prevArray.push(coord);
            axis.set(coord[mainAxis], prevArray);
        } else {
            axis.set(coord[mainAxis], [coord]);
        }
    });

    // Iterate over those arrays retrieving maximums or minimums
    let borders = [];
    for (let coords of axis.values()) {
        borders.push(coords.reduce((prev, curr) => compFunc(compare, prev[subAxis], curr[subAxis]) ? prev : curr));
    }

    // Return new array
    return borders;
}
