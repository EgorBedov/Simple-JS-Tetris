import BasicObject from "./basicObject";
import {FORMS, SIZE} from "../../utils/constants";

class Rectangle extends BasicObject {
    constructor(props) {
        super(props);
        this.type = FORMS.RECT;
    }

    cantMoveLeft(table) {
        let leftiest = this.place.reduce((prev, curr) => prev.column < curr.column ? prev : curr);
        if (leftiest.column - 1 < 0) {
            return true;
        }
        /**
         * @type {{row: number, column: number}[]}
         */
        let lefties = [];
        let min = this.place[0].column;
        // TODO: reduce
        this.place.forEach(coord => {
            let {column} = coord;
            if (column < min) {
                min = column;
                lefties = [coord];
            } else if (column === min) {
                lefties.push(coord);
            }
        });

        return lefties.every(left => table[left.row][left.column - 1] !== 0);
    }

    cantMoveRight(table) {
        let rightiest = this.place.reduce((prev, curr) => prev.column > curr.column ? prev : curr);
        if (rightiest.column + 1 >= SIZE) {
            return true;
        }
        /**
         * @type {{row: number, column: number}[]}
         */
        let righties = [];
        let max = this.place[this.place.length - 1].column;
        // TODO: reduce
        this.place.forEach(coord => {
            let {column} = coord;
            if (column > max) {
                max = column;
                righties = [coord];
            } else if (column === max) {
                righties.push(coord);
            }
        });

        return righties.every(right => table[right.row][right.column + 1] !== 0);
    }

    cantMoveDown(table) {
        let lowest = this.place.reduce((prev, curr) => prev.row > curr.row ? prev : curr);
        if (lowest.row + 1 >= SIZE) {
            return true;
        }
        /**
         * @type {{row: number, column: number}[]}
         */
        let lowests = this.place.filter(coord => table[coord.row + 1][coord.column] !== this.index);

        return lowests.every(low => table[low.row + 1][low.column] !== 0);
    }
}

export default Rectangle;
