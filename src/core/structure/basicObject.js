import { PLACE } from "../../utils/types";
import {FORMS} from "../../utils/constants";

// TODO: change to TS interface

class BasicObject {
    constructor(place = [{...PLACE}], center = {...PLACE}) {
        /**
         * @type {{column: number, row: number}[]}
         */
        this.place = place;
        /**
         *
         * @type {{column: number, row: number}}
         */
        this.center = center;
        this.type = '';
        this.index = 0;
    }

    cantMoveLeft(table) {}
    moveLeft(table) {}
    cantMoveRight() {}
    moveRight(table) {}
    cantMoveDown(table) {}
    /**
     * @param table {[[]]}
     * @return {number}
     */
    moveDown(table) {}
}

export default BasicObject;
