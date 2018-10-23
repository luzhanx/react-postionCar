import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Switch, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import Axios from 'axios';

import './index.less';

class PaySubmit extends Component {
	constructor(props) {
		super(props);

		document.title = '支付详情';
	}
	state = {
		checkedVip: true,
		annual_review_fee: 0,
		service_fee: 0,
		vip_fee: 0,
		sum: 0
	};
	componentWillMount() {
		console.log('支付订单ID是', this.props.match.params.id);
		let that = this;
		let id = this.props.match.params.id;

		Toast.loading('加载订单中', 0);
		Axios.post('/index/Order/payCost', { id: id }).then(({ data }) => {
			if (data.code === 0) {
				let annual_review_fee = parseInt(data.result.annual_review_fee, 10);
				let service_fee = parseInt(data.result.service_fee, 10);
				let vip_fee = parseInt(data.result.vip_fee, 10);
				let sum = annual_review_fee + service_fee + vip_fee;
				that.setState({
					annual_review_fee: annual_review_fee,
					service_fee: annual_review_fee,
					vip_fee: vip_fee,
					sum: sum
				});
				Toast.hide();
			} else if (data.code === 2) {
				window.location.href = '/index/login/weixin';
				Toast.hide();
			} else {
				return Toast.fail(data.msg, 2);
			}
		});
	}
	handleSwitchChange = (e) => {
		let that = this;

		this.setState(
			{
				checkedVip: !this.state.checkedVip
			},
			() => {
				if (that.state.checkedVip) {
					that.setState({
						sum: that.state.sum + that.state.vip_fee
					});
				} else {
					that.setState({
						sum: that.state.sum - that.state.vip_fee
					});
				}
			}
		);
		console.log(this.props.form.getFieldProps('Switch'));
	};
	wxPlay = (data) => {
		let that = this;

		if (typeof window.WeixinJSBridge === 'undefined') {
			if (document.addEventListener) {
				document.addEventListener(
					'WeixinJSBridgeReady',
					function(data) {
						that.__onBridgeReady(data);
					},
					false
				);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', function(data) {
					that.__onBridgeReady(data);
				});
				document.attachEvent('onWeixinJSBridgeReady', function(data) {
					that.__onBridgeReady(data);
				});
			}
		} else {
			that.__onBridgeReady(data);
		}
	};
	__onBridgeReady = (data) => {
		let that = this;

		window.WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			{
				appId: data.appId, //公众号名称，由商户传入
				timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
				nonceStr: data.nonceStr, //随机串
				package: data.package,
				signType: data.signType, //微信签名方式：
				paySign: data.paySign //微信签名
			},
			function(res) {
				console.log(res);
				if (res.err_msg === 'get_brand_wcpay_request:ok') {
					Toast.success('支付成功', 2, ()=> {
						that.props.history.push('reserve/pay');
					});
				} else {
					Toast.fail('支付失败', 2);
				}
			}
		);
	};

	submit = () => {
		let that = this;
		let formData = {
			id: this.props.match.params.id,
			vip: this.state.checkedVip ? 1 : 0
		};

		Axios.post('/index/pay/index', formData)
			.then(({ data }) => {
				console.log(data);
				if (data.code === 0) {
					that.wxPlay(data.result)
				} else if(data.code === 2){
					window.location.href = '/index/login/weixin';
				} else {
					return Toast.fail(data.msg, 2);
				}
			})
			.catch((e) => {
				return Toast.fail('支付异常', 2);
			});
	};
	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div className="payDetailPage">
				<div className="rows">
					<div className="row">
						<div className="key">年审费</div>
						<div className="value">
							<span className="conduct">￥{this.state.annual_review_fee}</span>
						</div>
					</div>
					<div className="row">
						<div className="key">服务费</div>
						<div className="value">
							<span className="conduct">￥{this.state.service_fee}</span>
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
								<span className="conduct">￥{this.state.vip_fee}</span>
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
							<span className="conduct">合计：￥{this.state.sum}</span>
						</div>
					</div>
				</div>
				<div className="submit" onClick={this.submit}>
					立即支付
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
