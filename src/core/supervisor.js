import Body from "./structure/body";
import Provider from "./provider";
import {FORMS, SIZE} from "../utils/constants";
import Designer from "./designer";
import {compFunc, getArrayOfZeros, getBorders} from "../utils/maths";

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
        if (where === 'right' && this.current.type === FORMS.CORNER) {
            console.log('corner');
        }

        // TODO: Prepare values
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
        // TODO: remove this switch
        switch (boundary) {
            case SIZE:
                if (compFunc('ge', furthest[axis] + 1, SIZE)) {
                    return;
                } else {
                    break;
                }
            case 0:
                if (compFunc('ls', furthest[axis] - 1, 0)) {
                    return;
                } else {
                    break;
                }
        }

        // Check all blocks
        let borders = getBorders(this.current.place, this.body, this.current.index, where);

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
            let lowest = this.current.place.reduce((prev, curr) => prev.row > curr.row ? prev : curr);
            if (this._removeLines() || lowest.row === SIZE - 1) {
                this._showNext();
                return;
            }
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
                this.move('down');
                this._step();
            }
        }, 1000);
    }
}

export default SV;
