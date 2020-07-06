import { PLACE } from "../../utils/types";
import {FORMS} from "../../utils/constants";

// TODO: change to TS interface

class BasicObject {
    constructor(place = [{...PLACE}]) {
        /**
         * @type {{column: number, row: number}[]}
         */
        this.place = place;
        this.type = '';
        this.index = 0;
    }

    cantMoveLeft(table) {}

    moveLeft(table) {
        this.place = this.place.sort((prev, curr) => prev.column - curr.column);
        this.place = this.place.map(coord => {
            table[coord.row][coord.column] = 0;
            coord.column--;
            table[coord.row][coord.column] = this.index;
            return coord;
        });
    }

    cantMoveRight() {}

    moveRight(table) {
        this.place = this.place.sort((prev, curr) => curr.column - prev.column);
        this.place = this.place.map(coord => {
            table[coord.row][coord.column] = 0;
            coord.column++;
            table[coord.row][coord.column] = this.index;
            console.log(table);
            return coord;
        });
    }

    cantMoveDown(table) {}
    /**
     * @param table {[[]]}
     * @return {number}
     */
    moveDown(table) {
        let depth = 0;
        this.place = this.place.map(coord => {
            table[coord.row][coord.column] = 0;
            coord.row++;
            table[coord.row][coord.column] = this.index;
            depth = coord.row;
            return coord;
        });
        return depth;
    }
}

export default BasicObject;
