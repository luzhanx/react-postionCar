import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import './index.less';

class Login extends Component {
	constructor(props) {
		super(props);

		document.title = '支付信息';
	}
	componentWillMount() {
		console.log('支付订单ID是', this.props.match.params.id);
	}
	render() {
		return (
			<div className="payDetailPage">
				<div className="rows">
					<div className="row">
						<div className="key">年审费</div>
						<div className="value">
							<span className="conduct">￥300.00</span>
						</div>
					</div>
					<div className="row">
						<div className="key">服务费</div>
						<div className="value">
							<span className="conduct">￥200.00</span>
						</div>
					</div>
					<div className="row">
						<div className="key">VIP</div>
						<div className="value">
							<span className="conduct">￥100.00</span>
						</div>
					</div>
				</div>
				<div className="rows">
					<div className="row">
						<div className="key" />
						<div className="value">
							<span className="conduct">合计：￥600.00</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (store) => {
	return {
		xxx: store.xxx
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		func() {
			dispatch();
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
