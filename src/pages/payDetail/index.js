import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

import './index.less';

class Login extends Component {
	constructor(props) {
		super(props);

		document.title = '支付信息';
	}
	state = {
		server: 0,
		sum: 0,
		vip: 0,
		year: 0
	};
	componentWillMount() {
		let id = this.props.match.params.id;
		let that = this;

		Axios.get('/index/order/payDetails', {
			params: {
				id: id
			}
		}).then(({ data }) => {
			// console.log(data);
			if(data.code === 0){
				that.setState({
					server: data.data.server,
					sum: data.data.sum,
					vip: data.data.vip,
					year: data.data.year
				});
			}
		});
	}
	render() {
		return (
			<div className="payDetailPage">
				<div className="rows">
					<div className="row">
						<div className="key">年审费</div>
						<div className="value">
							<span className="conduct">￥{this.state.year}</span>
						</div>
					</div>
					<div className="row">
						<div className="key">服务费</div>
						<div className="value">
							<span className="conduct">￥{this.state.server}</span>
						</div>
					</div>

					<div className="row" style={{display: `${this.state.vip > 0 ? 'flex': 'none'}`}}>
						<div className="key">VIP</div>
						<div className="value">
							<span className="conduct">￥{this.state.vip}</span>
						</div>
					</div>
				</div>
				<div className="rows">
					<div className="row">
						<div className="key" />
						<div className="value">
							<span className="conduct">合计：￥{this.state.sum}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
