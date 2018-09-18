import React, { Component } from 'react';
// import { Link } from "react-router-dom";

import './index.less';

class Home extends Component {
	render() {
		return (
			<div className="home">
				<div className="nav">小目标</div>
				<div className="header" style={headerBg}>
					<div className="avatar">
						<img src={avatarImg} alt="" className="avatarImg" />
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
