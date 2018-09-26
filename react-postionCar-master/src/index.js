import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from '@/App';

import 'lib-flexible';
import '@/assets/css/index.less';

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
);
