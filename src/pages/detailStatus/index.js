import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Zmage from 'react-zmage';

import Axios from 'axios';

import './index.less';

class Login extends Component {
	constructor(props) {
		super(props);

		document.title = '同城在线验车';
	}
	componentWillMount() {
		let id = this.props.match.params.id;
		let that = this;

		Axios.get('/index/order/status', {
			params: {
				id: id
			}
		}).then(({ data }) => {
			if (data.code === 0) {
				that.setState({
					username: data.data.user.username,
					tel: data.data.user.tel,
					img: data.data.img,
					status: data.data.status
				});
			}
		});
	}
	state = {
		username: '',
		tel: '',
		img: [],
		status: ''
	}
	render() {
		let statusText = '';
		if (this.state.status === 0) {
			statusText = '待处理';
		} else if (this.state.status === 1) {
			statusText = '进行中';
		} else if (this.state.status === 2) {
			statusText = '已完成';
		}
		return (
			<div className="detailStatusPage">
				<div className="rows">
					<div className="row">
						<div className="key">服务人员</div>
						<div className="value">
							<span className="conduct">{this.state.username}</span>
						</div>
					</div>
				</div>

				<div className="rows">
					<div className="row">
						<div className="key">预约状态</div>
						<div className="value">
							<span>{statusText}</span>
						</div>
					</div>
				</div>
				<div className="rows">
					<a href={`tel:${this.state.tel}`} className="row">
						<div className="key">联系电话</div>
						<div className="value">
							<span>{this.state.tel}</span>
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
					{this.state.img.map((item, index) => {
						return (
							<div className="imgBox" key={index}>
								<Zmage
									controller={{
										zoom: false
									}}
									src={item.src}
								/>
							</div>
						);
					})}
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
