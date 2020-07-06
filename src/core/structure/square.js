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

    cantMoveRight(table) {
        return this.place.every(coord => coord.column + 1 >= SIZE || table[coord.row][coord.column + 1] !== 0);
    }

    cantMoveDown(table) {
        return this.place.every(coord => coord.row + 1 >= SIZE || table[coord.row + 1][coord.column] !== 0);
    }
}

export default Square;
