import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.less';

class Home extends Component {
	componentDidMount() {
		document.cookie = 'PHPSESSID=' + 'vdnha4r26mq55g35im7pnhnnhs';
	}

	render() {
		return (
			<div className="homePage">
				<li>
					<a href="https://vehicle-location.xtow.net/index/login/weixin">微信授权登录</a>
				</li>
				<li>
					<Link to="/reserve">预约列表</Link>
				</li>
				<li>
					<Link to="/add">添加上门</Link>
				</li>
				<li>
					<Link to="/help/id/2">同城上线验车</Link>
				</li>
				<li>
					<Link to="/help/id/1">华基协议</Link>
				</li>
				<li>
					<Link to="/reserve/paySubmit/id/1">提交预约支付页面</Link>
				</li>
				<li>
					<Link to="/reserve/pay">支付成功提示页</Link>
				</li>
				<li>
					<Link to="/reserve/detail/id/1">预约详情</Link>
				</li>
				<li>
					<Link to="/reserve/detailStatus/id/1">预约状态</Link>
				</li>
				<li>
					<Link to="/map/id/1">服务人员定位</Link>
				</li>
				<li>
					<Link to="/reserve/payDetail/id/1">支付信息</Link>
				</li>
			</div>
		);
	}
}

export default Home;
