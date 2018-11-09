import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Zmage from 'react-zmage';
import { Toast } from 'antd-mobile';

import './index.less';
import Axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);

		document.title = '同城在线验车';
	}
	state = {
		status: '', // 0=待处理 1=处理中 2=已完成
		img: '', //现场图片
		arrear: '', //机构代码前6
		plate_number: '', //车牌
		contact: '', //联系人,
		appoint_time: '', //预约时间,
		phone: '', //手机号,
		address: '',
		pay_status: 0 //0=未支付 1=已支付
	};
	componentWillMount() {
		console.log('订单ID是', this.props.match.params.id);
		let id = this.props.match.params.id;
		let that = this;

		Toast.loading('加载中', 0);
		Axios.get('/index/order/details', {
			params: {
				id: id
			}
		}).then(({ data }) => {
			if (data.code === 2) {
				return (window.location.href = '/index/login/weixin');
			}
			// console.log(data);
			that.setState({
				id: data.id,
				status: data.status, // 0=待处理 1=处理中 2=已完成
				img: data.img, //现场图片
				arrear: data.arrear, //机构代码6
				plate_number: data.plate_number, //车牌
				contact: data.contact, //联系人,
				appoint_time: data.appoint_time, //预约时间,
				phone: data.phone, //手机号,
				address: data.address,
				pay_status: data.pay_status //0=未支付 1=已支付
			});
			Toast.hide();
		});
	}
	render() {
		let Status = null;
		if (this.state.status === 0) {
			Status = (
				<div className="rows">
					<div className="row">
						<div className="key">预约状态</div>
						<div className="value">
							<span className="conduct">待处理</span>
						</div>
					</div>
				</div>
			);
		} else if (this.state.status === 1) {
			Status = (
				<div className="rows">
					<Link className="row" to={`/reserve/detailStatus/id/${this.state.id}`}>
						<div className="key">预约状态</div>
						<div className="value">
							<span className="treated">进行中</span>
							<i className="iconfont icon-right" />
						</div>
					</Link>
				</div>
			);
		} else if (this.state.status === 2) {
			Status = (
				<div className="rows">
					<Link className="row" to={`/reserve/detailStatus/id/${this.state.id}`}>
						<div className="key">预约状态</div>
						<div className="value">
							<span className="">已完成</span>
						</div>
					</Link>
				</div>
			);
		} else {
			Status = null;
		}
		return (
			<div className="detailPage">
				{Status}

				<div className="rows">
					<div
						onClick={() => {
							// 0=未支付 1=已支付
							if (this.state.pay_status === 0) {
								this.props.history.push('/reserve/paySubmit/id/' + this.state.id);
							} else if (this.state.pay_status === 1) {
								this.props.history.push('/reserve/payDetail/id/' + this.state.id);
							}
						}}
						className="row"
					>
						<div className="key">支付信息</div>
						<div className="value">
							<span />
							<i className="iconfont icon-right" />
						</div>
					</div>
				</div>
				{this.state.status === 1 ? (
					<div className="rows">
						<Link to={`/map/id/${this.state.id}`} className="row">
							<div className="key">服务人员定位</div>
							<div className="value">
								<span />
								<i className="iconfont icon-right" />
							</div>
						</Link>
					</div>
				) : null}

				<div className="rows">
					<div className="row">
						<div className="key">上传资料(车辆行驶证)</div>
						<div className="value">
							<span className="" />
						</div>
					</div>

					<div className="imgBox">
						<Zmage
							controller={{
								zoom: false
							}}
							src={this.state.img}
						/>
					</div>

					<div className="row">
						<div className="key">机构代码前六位</div>
						<div className="value">
							<span className="">{this.state.arrear}</span>
						</div>
					</div>
				</div>

				<div className="linetext">预约信息</div>
				<div className="rows">
					<div className="row">
						<div className="key">车牌</div>
						<div className="value">
							<span className="">{this.state.plate_number}</span>
						</div>
					</div>
					<div className="row">
						<div className="key">联系人</div>
						<div className="value">
							<span className="">{this.state.contact}</span>
						</div>
					</div>
					<div className="row">
						<div className="key">预约时间</div>
						<div className="value">
							<span className="">{this.state.appoint_time}</span>
						</div>
					</div>
					<a href="tel:13076248607" className="row">
						<div className="key">手机号</div>
						<div className="value">
							<span className="">{this.state.phone}</span>
						</div>
					</a>
					<div className="row">
						<div className="key">取车地址</div>
						<div className="value">
							<span className="" />
						</div>
					</div>
					<div className="row">
						<div className="key" />
						<div className="value">
							<span className="">{this.state.address}</span>
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
