import Body from "./structure/body";
import Provider from "./provider";
import {FORMS, SIZE} from "../utils/constants";
import Designer from "./designer";
import {getArrayOfZeros} from "../utils/maths";

class SV {
    constructor() {
        this._clear();
        this.provider = new Provider();
        this.designer = new Designer(this.moveLeft.bind(this), this.moveRight.bind(this), this.moveDown.bind(this));
    }

    _clear() {
        this.gameOver = false;
        this.objects = new Map();   // <number, BasicObject>
        this.current = null;
        /**
         * @type {[[]]}
         */
        this.body = Body();
    }

    start() {
        this._clear();
        this._rerender();
        this._showNext();
        this._step();
    }

    _showNext() {
        if (this._gotSpaceForNext()) {
            this._initNewObject();
        } else {
            this._endGame();
        }
        this._rerender();
    }

    rotateLeft() {

    }

    moveLeft() {
        if (this.current.place.every(coord => coord.column - 1 < 0 || this.body[coord.row][coord.column - 1] !== 0)) {
            return;
        }
        this.current.place = this.current.place.map(coord => {
            this.body[coord.row][coord.column] = 0;
            coord.column--;
            this.body[coord.row][coord.column] = this.current.index;
            return coord;
        });
        this._rerender();
    }

    moveRight() {
        if (this.current.place.every(coord => coord.column + 1 >= SIZE || this.body[coord.row][coord.column + 1] !== 0)) {
            return;
        }
        this.current.place = this.current.place.map(coord => {
            this.body[coord.row][coord.column] = 0;
            coord.column++;
            this.body[coord.row][coord.column] = this.current.index;
            return coord;
        });
        this._rerender();
    }

    moveDown() {
        if (this.current.place.every(coord => this.body[coord.row + 1][coord.column] !== 0)) {
            this._showNext();
            return;
        }

        let depth = 0;
        this.current.place = this.current.place.map(coord => {
            this.body[coord.row][coord.column] = 0;
            coord.row++;
            this.body[coord.row][coord.column] = this.current.index;
            depth = coord.row;
            return coord;
        });
        if (this._removeLines() || depth === SIZE - 1) {
            this._showNext();
            return;
        }
        this._rerender();
    }

    _rerender() {
        this.designer.updateCanvas(this.body);
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

    _removeLines() {
        let removed = false;
        this.body = this.body.map(row => {
            if (row.every(cell => cell !== 0)) {
                removed = true;
                return getArrayOfZeros(SIZE);
            } else {
                return row;
            }
        });

        if (removed) {
            // Move everything one block down (starting from the bottom)
            for (let iii = SIZE - 1; iii > 0; iii--) {
                if (this.body[iii].every(cell => cell === 0)) {
                    for (let jjj = iii; jjj > 0; jjj--) {
                        this.body[jjj] = this.body[jjj - 1];
                    }
                    this.body[0] = getArrayOfZeros(SIZE); // top layer
                }
            }
        }

        this._rerender();
        return removed;
    }

    _endGame() {
        this.gameOver = true;
        console.log('GAME OVER');
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

    _step() {
        setTimeout(() => {
            if (!this.gameOver) {
                this.moveDown();
                this._step();
            }
        }, 1000);
    }
}

export default SV;
