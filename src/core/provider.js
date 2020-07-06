import {MAX_FORMS} from "../utils/constants";
import Square from "./structure/square";
import Rectangle from "./structure/rectangle";
import { getRandomInt } from "../utils/maths";

class Provider {
    constructor() {
        this.nextObject = null;
    }

    _createNext() {
        switch (getRandomInt(1)) {  // TODO: change to MAX_FORMS to access rectangle
        case 0:
            this.nextObject = new Rectangle();
            break;
        case 1:
            this.nextObject = new Rectangle();
            break;
        }
    }

    /**
     * @return {string}
     */
    previewNextType() {
        if (!this.nextObject) {
            this._createNext();
        }
        return this.nextObject.type;
    }

    /**
     * @return {BasicObject}
     */
    getNext() {
        if (!this.nextObject) {
            this._createNext();
        }
        let tmpObj = Object.assign(Object.create(Object.getPrototypeOf(this.nextObject)), this.nextObject);
        this._createNext();
        return tmpObj;
    }
}

export default Provider;
