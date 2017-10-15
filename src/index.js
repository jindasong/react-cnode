import ReactDOM from 'react-dom';
import Router from './routers';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(Router, document.getElementById('root'));
registerServiceWorker();
