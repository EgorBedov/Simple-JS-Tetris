import Body from "./structure/body";
import Provider from "./provider";
import {FORMS, SIZE} from "../utils/constants";
import Designer from "./designer";

class SV {
    constructor() {
        this.body = Body();
        this.objects = new Map();   // <number, BasicObject>
        this.current = null;
        this.provider = new Provider();
        this.designer = new Designer();
        console.log(this.body);
    }

    start() {
        this._initNewObject();

    }

    _showNext() {
        if (this._gotSpaceForNext()) {
            this._initNewObject();

            this.designer.updateCanvas();
        } else {
            this._endGame();
        }
    }

    rotateLeft() {

    }

    rotateRight() {

    }

    moveDown() {

    }

    _initNewObject() {
        // Store new object
        let obj = this.provider.getNext();
        obj.index = this.objects.size;

        // Place it in body
        switch (obj.type) {
            case FORMS.SQUARE:
                this.body[0][5] = obj.index;
                obj.place = [{row: 0, column: 5}];
                obj.center = {row: 0, column: 5};
                break;
            case FORMS.RECT:
                if (!this.body[0][5] && !this.body[0][6]) {
                    this.body[0][5] = obj.index;
                    this.body[0][6] = obj.index;
                } else if (!this.body[0][4] && !this.body[0][5]) {
                    this.body[0][4] = obj.index;
                    this.body[0][5] = obj.index;
                } else if (!this.body[0][4] && !this.body[1][4]) {
                    this.body[0][4] = obj.index;
                    this.body[1][4] = obj.index;
                } else if (!this.body[0][5] && !this.body[1][5]) {
                    this.body[0][5] = obj.index;
                    this.body[1][5] = obj.index;
                } else if (!this.body[0][6] && !this.body[1][6]) {
                    this.body[0][6] = obj.index;
                    this.body[1][6] = obj.index;
                } else {
                    console.error('wat ?');
                }
                break;
        }
        this.current = obj;
        this.objects.set(obj.index, obj);
    }

    _step() {

    }

    _moveObject() {

    }

    _endGame() {

    }

    /**
     * !0 = true
     * !1 = false;
     * @return {{
     *     boolean,
     *     coordinates,
     * }}
     * @private
     */
    _gotSpaceForNext() {
        // TODO: firstly: check if there is place in top center
        // TODO: make body dynamic so that it won't depend on magic numbers
        switch (this.provider.previewNextType()) {
            case FORMS.SQUARE:
                return !this.body[0][5];
            case FORMS.RECT:
                return (!this.body[0][5] && !this.body[0][6])
                    || (!this.body[0][4] && !this.body[0][5])
                    || (!this.body[0][4] && !this.body[1][4])
                    || (!this.body[0][5] && !this.body[1][5])
                    || (!this.body[0][6] && !this.body[1][6])
        }
    }
}

export default SV;
