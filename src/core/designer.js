import {SIZE} from "../utils/constants";

class Designer {
    constructor(data, onLeft, onRight, onDown) {
        this.onLeft = onLeft;
        this.onRight = onRight;
        this.onDown = onDown;
        this._initCanvas();
        this.data = data;
        /**
         * @type {HTMLTableElement}
         */
        this.table = null;

        this._initCanvas();
    }

    _initCanvas() {
        this.table = document.querySelector('#application').insertAdjacentElement('afterbegin', this._createTable());
        window.addEventListener('keyDown', (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                case 'KeyA':
                    this.onLeft();
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    this.onRight();
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    this.onDown();
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

    updateCanvas() {
        let rows = this.table.rows;
        for (let iii = 0; iii < SIZE; iii++) {
            let row = rows.item(iii);
            for (let jjj = 0; jjj < SIZE; jjj++) {
                row.cells.item(jjj).innerText = this.data[iii][jjj];
            }
        }
    }
}

export default Designer;
