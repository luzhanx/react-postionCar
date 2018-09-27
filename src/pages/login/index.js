import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.less';

class Login extends Component {
	constructor(props) {
		super(props);

		document.title = '预约详情';
	}

	render() {
		return (
			<div className="detailPage">
				预约详情
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
