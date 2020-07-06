import { PLACE } from "../../utils/types";

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
}

export default BasicObject;
