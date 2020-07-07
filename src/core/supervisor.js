import Body from "./structure/body";
import Provider from "./provider";
import {FORMS, SIZE} from "../utils/constants";
import Designer from "./designer";
import {getArrayOfZeros} from "../utils/maths";

class SV {
    constructor() {
        this._clear();
        this.provider = new Provider();
        this.designer = new Designer(this.move.bind(this));
    }

    _clear() {
        this.gameOver = false;
        this.counter = 1;
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
        if (this.gameOver) {
            return;
        }
        if (this._gotSpaceForNext()) {
            this._initNewObject();
        } else {
            this._endGame();
        }
        this._rerender();
    }

    /**
     * @param where {'left' | 'right' | 'down'}
     */
    move(where) {
        switch (where) {
            case "down":
                break;
            case "left":
                break;
            case "right":
                break;
            default:
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
        obj.index = this.counter++;

        // Place it in body
        switch (obj.type) {
            case FORMS.SQUARE:
                this.body[0][5] = obj.index;
                obj.place = [{row: 0, column: 5}];
                break;
            case FORMS.RECT:
                let coords = [];
                if (!this.body[0][5] && !this.body[0][6]) {
                    coords = [0, 5, 0, 6];
                }
                this.body[coords[0]][coords[1]] = this.body[coords[2]][coords[3]] = obj.index;
                obj.place = [{row: coords[0], column: coords[1]}, {row: coords[2], column: coords[3]}];
                break;
            case FORMS.CORNER:
                this.body[0][5] = this.body[0][6] = this.body[1][5] = obj.index;
                obj.place = [
                    {
                        row: 0,
                        column: 5,
                    },
                    {
                        row: 0,
                        column: 6,
                    },
                    {
                        row: 1,
                        column: 5,
                    }
                ]
        }
        this.current = obj;
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
     * @return {boolean}
     * @private
     */
    _gotSpaceForNext() {
        switch (this.provider.previewNextType()) {
            case FORMS.SQUARE:
                return !this.body[0][5];
            case FORMS.RECT:
                return !this.body[0][5] && !this.body[0][6];
            case FORMS.CORNER:
                return !this.body[0][5] && !this.body[0][6] && !this.body[1][5];
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
