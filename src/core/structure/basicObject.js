import { PLACE } from "../../utils/types";

// TODO: change to TS interface

class BasicObject {
    constructor(place = [{...PLACE}], center = {...PLACE}) {
        this.place = place;
        this.center = center;
        this.type = '';
        this.index = 0;
    }
}

export default BasicObject;
