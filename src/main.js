import SV from './core/supervisor';

function appStart() {
    let supervisor = new SV();
    supervisor.start();
}

appStart();
