import BasicObject from "./basicObject";
import {FORMS, SIZE} from "../../utils/constants";

class Square extends BasicObject {
    constructor(props) {
        super(props);
        this.type = FORMS.SQUARE;
    }

    cantMoveLeft(table) {
        return this.place.every(coord => coord.column - 1 < 0 || table[coord.row][coord.column - 1] !== 0);
    }

    moveLeft(table) {
        this.place = this.place.map(coord => {
            table[coord.row][coord.column] = 0;
            coord.column--;
            table[coord.row][coord.column] = this.index;
            return coord;
        });
    }

    cantMoveRight(table) {
        return this.place.every(coord => coord.column + 1 >= SIZE || table[coord.row][coord.column + 1] !== 0);
    }

    moveRight(table) {
        this.place = this.place.map(coord => {
            table[coord.row][coord.column] = 0;
            coord.column++;
            table[coord.row][coord.column] = this.index;
            return coord;
        });
    }

    cantMoveDown(table) {
        return this.place.every(coord => table[coord.row + 1][coord.column] !== 0);
    }

    moveDown(table) {
        let depth = 0;
        this.place = this.place.map(coord => {
            table[coord.row][coord.column] = 0;
            coord.row++;
            table[coord.row][coord.column] = this.index;
            depth = coord.row;
            return coord;
        });
        return depth;
    }
}

export default Square;
