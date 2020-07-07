import {SIZE} from "../utils/constants";

class Designer {
    constructor(onClick) {
        /**
         * @type {HTMLTableElement}
         */
        this.table = null;
        this._initCanvas(onClick);
    }

    _initCanvas(onClick) {
        this.table = document.querySelector('#application').insertAdjacentElement('afterbegin', this._createTable());
        document.body.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                case 'KeyA':
                    onClick('left');
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    onClick('right');
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    onClick('down');
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
            }
        }
    }
}

export default Designer;
