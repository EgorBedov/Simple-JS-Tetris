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
        this.place = this.place.map(coord => {
            table[coord.row][coord.column] = 0;
            coord.column--;
            return coord;
        });
        this.place.forEach(coord => {
            table[coord.row][coord.column] = this.index;
        });
    }

    cantMoveRight() {}

    moveRight(table) {
        this.place = this.place.map(coord => {
            table[coord.row][coord.column] = 0;
            coord.column++;
            return coord;
        });
        this.place.forEach(coord => {
            table[coord.row][coord.column] = this.index;
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
            depth = coord.row;
            return coord;
        });
        this.place.forEach(coord => {
            table[coord.row][coord.column] = this.index;
        });
        return depth;
    }
}

export default BasicObject;
