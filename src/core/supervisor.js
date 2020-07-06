import Body from "./structure/body";
import Provider from "./provider";
import {FORMS, SIZE} from "../utils/constants";
import Designer from "./designer";

class SV {
    constructor() {
        this._clear();
        this.provider = new Provider();
        this.designer = new Designer(this.moveLeft(), this.moveRight(), this.moveDown());
    }

    _clear() {
        this.objects = new Map();   // <number, BasicObject>
        this.current = null;
        this.body = Body();
    }

    start() {
        this._clear();
        this.designer.updateCanvas(this.body);
        this._showNext();
    }

    _showNext() {
        if (this._gotSpaceForNext()) {
            this._initNewObject();
            this.designer.updateCanvas(this.body);
        } else {
            this._endGame();
        }
    }

    rotateLeft() {

    }

    moveLeft() {

    }

    moveRight() {

    }

    moveDown() {

    }

    _initNewObject() {
        // Store new object
        let obj = this.provider.getNext();
        obj.index = this.objects.size + 1;

        // Place it in body
        switch (obj.type) {
            case FORMS.SQUARE:
                this.body[0][5] = obj.index;
                obj.place = [{row: 0, column: 5}];
                obj.center = {row: 0, column: 5};
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
        }
    }
}

export default SV;
