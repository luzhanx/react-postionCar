import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
			<div className="detailStatusPage">
				<div className="rows">
					<div className="row">
						<div className="key">服务人员</div>
						<div className="value">
							<span className="conduct">南山林先生</span>
						</div>
					</div>
				</div>

				<div className="rows">
					<div className="row">
						<div className="key">预约状态</div>
						<div className="value">
							<span>进行中</span>
						</div>
					</div>
				</div>
				<div className="rows">
					<a href="tel:13076248607" className="row">
						<div className="key">联系电话</div>
						<div className="value">
							<span>13076248607</span>
							<i className="iconfont icon-right" />
						</div>
					</a>
				</div>
				<div className="rows">
					<div className="row">
						<div className="key">现场图</div>
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
						/>
					</div>
					<div className="imgBox">
						<Zmage
							controller={{
								zoom: false
							}}
							src={avatarimg}
						/>
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
