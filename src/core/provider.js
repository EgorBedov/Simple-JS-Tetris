import {MAX_FORMS} from "../utils/constants";
import Rectangle from "./structure/rectangle";
import { getRandomInt } from "../utils/maths";
import Square from "./structure/square";
import Corner from "./structure/corner";

class Provider {
    constructor() {
        this.nextObject = null;
    }

    _createNext() {
        switch (getRandomInt(MAX_FORMS)) {
        case 0:
            this.nextObject = new Square();
            break;
        case 1:
            this.nextObject = new Rectangle();
            break;
        case 2:
            this.nextObject = new Corner();
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
