import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// 引入组件
// import Home from '@/pages/home/loadable';
// import Login from '@/pages/login/loadable';
import Reserve from '@/pages/reserve/loadable';
// import Test from '@/pages/test';
import Map from '@/pages/map/loadable';
import Add from '@/pages/add/loadable';
import Help from '@/pages/help/loadable';
import Detail from '@/pages/detail/loadable';
import DetailStatus from '@/pages/detailStatus/loadable';
import PayDetail from '@/pages/payDetail/loadable';
import Pay from '@/pages/pay/loadable';
import PaySubmit from '@/pages/paySubmit/loadable';

// 引入文件
import store from '@/store';

class App extends Component {
	componentDidMount() {

	}

	render() {
		return (
			<div className="app">
				<Provider store={store}>
					<Switch>
						<Route path="/" exact component={Reserve} />
						<Route path="/add" exact component={Add} />
						<Route path="/map/id/:id" exact component={Map} />
						<Route path="/reserve" exact component={Reserve} />
						<Route path="/reserve/detail/id/:id" exact component={Detail} />
						<Route path="/reserve/detailStatus/id/:id" exact component={DetailStatus} />
						<Route path="/help/id/:id" exact component={Help} />
						<Route path="/reserve/payDetail/id/:id" exact component={PayDetail} />
						<Route path="/reserve/pay" exact component={Pay} />
						<Route path="/reserve/paySubmit/id/:id" exact component={PaySubmit} />
						<Route render={() => 404} />
					</Switch>
				</Provider>
			</div>
		);
	}
}

export default App;
