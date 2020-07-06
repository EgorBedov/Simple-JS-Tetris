const SIZE = 10;
const DIMENSIONS = 2;

class Body {
    constructor() {
        this.body = this.initBody();
    }

    initBody() {
        // TODO: improve it with map() or sth
        let tmpArray = [];
        for (let iii = 0; iii < DIMENSIONS; iii++) {
            tmpArray.push([]);
            for (let jjj = 0; jjj < SIZE; jjj++) {
                tmpArray[iii].push(0);
            }
        }
        // return Array.from(Array.from('0'.repeat(SIZE)));
        return tmpArray;
    }

    getBody() {
        return this.body;
    }
}

export default Body;
