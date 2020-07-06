import {DIMENSIONS, SIZE} from "../../utils/constants";

function Body() {
    // TODO: improve it with map() or sth
    let tmpArray = [];
    for (let iii = 0; iii < SIZE; iii++) {
        tmpArray.push([]);
        for (let jjj = 0; jjj < SIZE; jjj++) {
            tmpArray[iii].push(0);
        }
    }
    // return Array.from(Array.from('0'.repeat(SIZE)));
    return tmpArray;
}

export default Body;
