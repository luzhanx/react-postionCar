import React from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
	loader: () => import('./'),
	loading() {
		return <h1>页面加载中Loading...</h1>;
	}
});

export default () => <LoadableComponent />;
