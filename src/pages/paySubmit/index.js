import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Switch } from 'antd-mobile';
import { createForm } from 'rc-form';

import './index.less';

class PaySubmit extends Component {
	constructor(props) {
		super(props);

		document.title = '支付详情';
	}
	state = {
		checkedVip: true
	};
	componentWillMount() {
		console.log('支付订单ID是', this.props.match.params.id);
	}
	handleSwitchChange = (e) => {
		let checkedVip = this.props.form.getFieldProps('Switch').value;

		if (checkedVip === undefined) {
			checkedVip = true;
		}

		this.setState({
			checkedVip: checkedVip
		});
		console.log(this.props.form.getFieldProps('Switch'));
	};

	render() {
		const { getFieldProps } = this.props.form;
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
							<span className="conduct">
								<Switch
									onClick={this.handleSwitchChange}
									{...getFieldProps('Switch', {
										initialValue: true,
										valuePropName: 'checked'
									})}
								/>
							</span>
						</div>
					</div>
					{this.state.checkedVip ? (
						<div className="row">
							<div className="key" />
							<div className="value">
								<span className="conduct">￥100.00</span>
							</div>
						</div>
					) : (
						''
					)}
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

export default connect(mapStateToProps)(withRouter(createForm()(PaySubmit)));
