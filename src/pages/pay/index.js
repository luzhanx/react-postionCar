import React, { Component } from 'react';

import { withRouter, Link } from 'react-router-dom';
import successImg from '@/assets/img/success.png';

import './index.less';

class Home extends Component {
	componentWillMount() {
		let that = this;
		window.addEventListener(
			'popstate',
			() => {
				that.props.history.push('/reserve');
			},
			false
		);
	}

	render() {
		return (
			<div className="payPage">
				<div className="panle">
					<img src={successImg} className="success" alt="" />
					<div className="text1">资料提交成功</div>
					<div className="text2">稍后客服以短信联系您</div>
				</div>
				<Link to="/reserve" className="btn">
					完成
				</Link>
			</div>
		);
	}
}

export default withRouter(Home);
