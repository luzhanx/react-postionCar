import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import successImg from '@/assets/img/success.png';

import './index.less';

class Home extends Component {
	render() {
		return (
			<div className="payPage">
				<div className="panle">
					<img src={successImg} className="success" alt="" />
					<div className="text1">资料提交成功</div>
					<div className="text2">稍后客服以短信联系您</div>
				</div>
				<div className="btn">完成</div>
			</div>
		);
	}
}

export default Home;
