import Body from "./body";
import {FORMS, SIZE} from "../utils/constants";
import Designer from "./designer";
import {bodyEmptyFrom, compFunc, getArrayOfZeros, getBordersNew, getRandomInt} from "../utils/maths";

class SV {
    constructor() {
        this.objects = [FORMS.RECT, FORMS.SQUARE, FORMS.CORNER];
        this._clear();
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
        this._initNewObject();
        if (this._gotSpaceForNext()) {
            this._injectNewObject();
        } else {
            this._endGame();
        }
        this._rerender();
    }

    /**
     * @param where {'left' | 'right' | 'down'}
     */
    move(where) {
        let boundary, compare, axis, changeAxis;
        switch (where) {
            case "down":
                boundary = SIZE;
                compare = 'ge';
                axis = 'row';
                changeAxis = a => ++a;
                break;
            case "left":
                boundary = 0;
                compare = 'ls';
                axis = 'column';
                changeAxis = a => --a;
                break;
            case "right":
                boundary = SIZE;
                compare = 'ge';
                axis = 'column';
                changeAxis = a => ++a;
                break;
            default:
                return;
        }

        // Check furthest block for boundaries
        let furthest = this.current.place.reduce(
            (prev, curr) =>
                compFunc(compare, prev[axis], curr[axis]) ? prev : curr);
        if (compFunc(compare, changeAxis(furthest[axis]), boundary)) {
            return;
        }

        // Check all blocks
        let borders = getBordersNew(this.current, this.body, where);
        if (borders.some(b => this.body[where === 'down' ? b.row + 1 : b.row][where === 'left' ? b.column - 1 : where === 'right' ? b.column + 1 : b.column] !== 0)) {
            if (where === 'down') {
                this._showNext();
            }
            return;
        }

        // Clear previous space
        this.current.place = this.current.place.map(coord => {
            this.body[coord.row][coord.column] = 0;
            coord[axis] = changeAxis(coord[axis]);
            return coord;
        });

        // Paint new space
        this.current.place.forEach(coord => {
            this.body[coord.row][coord.column] = this.current.index;
        });

        // Check if need to push next object
        if (where === 'down') {
            let borders = getBordersNew(this.current, this.body, where);
            if (borders.some(b => b.row + 1 >= SIZE || this.body[b.row + 1][b.column] !== 0)) {
                this._removeLines();
                this._showNext();
            }
        }

        this._rerender();
    }

    _rerender() {
        this.designer.updateCanvas(this.body);
    }

    _initNewObject() {
        // Store new object
        let obj = {};
        obj.type = this.objects[getRandomInt(this.objects.length)];
        obj.index = this.counter++;
        this.current = obj;
    }

    _injectNewObject() {
        switch (this.current.type) {
            case FORMS.SQUARE:
                this.body[0][5] = this.current.index;
                this.current.place = [{row: 0, column: 5}];
                break;
            case FORMS.RECT:
                let coords = [];
                if (!this.body[0][5] && !this.body[0][6]) {
                    coords = [0, 5, 0, 6];
                }
                this.body[coords[0]][coords[1]] = this.body[coords[2]][coords[3]] = this.current.index;
                this.current.place = [{row: coords[0], column: coords[1]}, {row: coords[2], column: coords[3]}];
                break;
            case FORMS.CORNER:
                this.body[0][5] = this.body[0][6] = this.body[1][5] = this.current.index;
                this.current.place = [
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
            let iii = SIZE - 1;
            while (iii > 0) {
                if (this.body[iii].every(cell => cell === 0) && !bodyEmptyFrom(iii, this.body)) {
                    for (let jjj = iii; jjj > 0; jjj--) {
                        this.body[jjj] = this.body[jjj - 1];
                    }
                    this.body[0] = getArrayOfZeros(SIZE); // top layer
                } else {
                    iii--;
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
        switch (this.current.type) {
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
                this.move('down');
                this._step();
            }
        }, 1000);
    }
}

export default SV;
