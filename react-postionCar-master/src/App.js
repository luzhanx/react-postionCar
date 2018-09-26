import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// 引入组件
// import Home from '@/pages/home';
// import Login from '@/pages/login/loadable';
import Reserve from '@/pages/reserve/loadable';
// import Test from '@/pages/test';
import Map from '@/pages/map/loadable';
import Add from '@/pages/add/loadable';
import Help from '@/pages/help/loadable';

// 引入文件
import store from '@/store';

class App extends Component {
	render() {
		return (
			<div className="app">
				<Provider store={store}>
					<Switch>
						<Route path="/" exact component={Reserve} />
						{/* <Route path="/home" exact component={Home} /> */}
						<Route path="/help/id/:id" component={Help} />
						<Route path="/add" component={Add} />
						<Route path="/map" component={Map} />
						<Route path="/reserve" component={Reserve} />
					</Switch>
				</Provider>
			</div>
		);
	}
}

export default App;
