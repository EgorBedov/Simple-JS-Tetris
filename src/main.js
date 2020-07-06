function appStart() {
    let base = document.querySelector('#application').insertAdjacentElement('afterbegin', createBase());
    base.addEventListener('keyDown', (e) => {
        switch (e.code) {
            case 'ArrowLeft':
            case 'KeyA':
                break;
            case 'ArrowRight':
            case 'KeyD':
                break;
            case 'ArrowUp':
            case 'KeyW':
                break;
            case 'ArrowDown':
            case 'KeyS':
                break;
        }
    });
}

function createBase() {
    let elem = document.createElement('div');
    elem.className = 'base';
    return elem;
}

appStart();
