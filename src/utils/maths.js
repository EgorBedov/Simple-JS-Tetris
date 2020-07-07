export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getArrayOfZeros(len) {
    return new Array(len).fill(0);
}

/**
 * @param how {'ls' | 'ge'}
 */
export function compFunc(how, a, b) {
    switch (how) {
        case "ls":
            return a < b;
        case "ge":
            return a >= b;
    }
}
