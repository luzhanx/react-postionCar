import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.less';

class Login extends Component {
	constructor(props) {
		super(props);

		document.title = '同城在线验车';
	}

	render() {
		return <div>Login</div>;
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
