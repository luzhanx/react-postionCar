import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Zmage from 'react-zmage';
import avatarimg from '@/assets/img/avatar.jpg';

import './index.less';

class Login extends Component {
	constructor(props) {
		super(props);

		document.title = '同城在线验车';
	}
	componentWillMount() {
		console.log('订单ID是', this.props.match.params.id);
	}
	render() {
		return (
			<div className="detailPage">
				<div className="rows">
					<Link className="row" to="/reserve/detailStatus/id/1">
						<div className="key">预约状态</div>
						<div className="value">
							<span className="treated">进行中</span>
							<i className="iconfont icon-right" />
						</div>
					</Link>
				</div>
				<div className="rows">
					<div className="row">
						<div className="key">预约状态</div>
						<div className="value">
							<span className="">已完成</span>
						</div>
					</div>
				</div>
				<div className="rows">
					<div className="row">
						<div className="key">预约状态</div>
						<div className="value">
							<span className="conduct">待处理</span>
						</div>
					</div>
				</div>
				<div className="rows">
					<Link to={`/reserve/payDetail/id/${Math.random()}`} className="row">
						<div className="key">支付信息</div>
						<div className="value">
							<span />
							<i className="iconfont icon-right" />
						</div>
					</Link>
				</div>
				<div className="rows">
					<Link to={`/map/id/${Math.random()}`} className="row">
						<div className="key">服务人员定位</div>
						<div className="value">
							<span />
							<i className="iconfont icon-right" />
						</div>
					</Link>
				</div>

				<div className="rows">
					<div className="row">
						<div className="key">上传资料</div>
						<div className="value">
							<span className="" />
						</div>
					</div>

					<div className="imgBox">
						<Zmage
							controller={{
								zoom: false
							}}
							src={avatarimg}
							alt=""
						/>
					</div>

					<div className="row">
						<div className="key">身份证后四位数</div>
						<div className="value">
							<span className="">4432</span>
						</div>
					</div>
				</div>

				<div className="linetext">预约信息</div>
				<div className="rows">
					<div className="row">
						<div className="key">车牌</div>
						<div className="value">
							<span className="">粤F - KY666</span>
						</div>
					</div>
					<div className="row">
						<div className="key">联系人</div>
						<div className="value">
							<span className="">黄先生</span>
						</div>
					</div>
					<div className="row">
						<div className="key">预约时间</div>
						<div className="value">
							<span className="">2018年9月27日12:26:14</span>
						</div>
					</div>
					<a href="tel:13076248607" className="row">
						<div className="key">手机号</div>
						<div className="value">
							<span className="">13076248607</span>
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
							<span className="">address</span>
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
