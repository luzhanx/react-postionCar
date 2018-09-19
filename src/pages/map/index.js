import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './index.less';

class Map extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Map ID =>{this.props.match.params.id}</h1>
			</div>
		);
	}

	componentDidMount() {}
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Map));
