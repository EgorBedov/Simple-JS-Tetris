import SV from './core/supervisor';
import '../static/style.css';

function appStart() {
    let supervisor = new SV();
    supervisor.start();
}

appStart();
