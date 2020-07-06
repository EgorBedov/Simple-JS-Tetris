class Designer {
    constructor(onLeft, onRight, onDown) {
        this.canvas = null;
        this.onLeft = onLeft;
        this.onRight = onRight;
        this.onDown = onDown;
        this._initCanvas();
    }

    _initCanvas() {
        let base = document.querySelector('#application').insertAdjacentElement('afterbegin', createBase());
        base.addEventListener('keyDown', (e) => {
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

    _createBase() {
        let elem = document.createElement('div');
        elem.className = 'base';
        return elem;
    }

    updateCanvas() {

    }
}

export default Designer;
