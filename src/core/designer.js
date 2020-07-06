import {SIZE} from "../utils/constants";

class Designer {
    constructor(onLeft, onRight, onDown) {
        /**
         * @type {HTMLTableElement}
         */
        this.table = null;
        this._initCanvas(onLeft, onRight, onDown);
    }

    _initCanvas(onLeft, onRight, onDown) {
        this.table = document.querySelector('#application').insertAdjacentElement('afterbegin', this._createTable());
        document.body.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                case 'KeyA':
                    onLeft();
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    onRight();
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    onDown();
                    break;
            }
        });
    }

    _createTable() {
        let elem = document.createElement('table');
        elem.className = 'base';
        for (let iii = 0; iii < SIZE; iii++) {
            let newRow = document.createElement('tr');
            for (let jjj = 0; jjj < SIZE; jjj++) {
                newRow.appendChild(document.createElement('td'));
            }
            elem.appendChild(newRow);
        }
        return elem;
    }

    updateCanvas(data) {
        let rows = this.table.rows;
        for (let iii = 0; iii < SIZE; iii++) {
            let row = rows.item(iii);
            for (let jjj = 0; jjj < SIZE; jjj++) {
                row.cells.item(jjj).className = `color-${data[iii][jjj] === 0 ? data[iii][jjj] : data[iii][jjj] % 20 + 1}`;
                row.cells.item(jjj).className = `color-${data[iii][jjj] % 20}`;
            }
        }
    }
}

export default Designer;
