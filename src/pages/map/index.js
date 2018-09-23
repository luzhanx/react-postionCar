import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './index.less';

class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isShow: true
		};
	}
	componentDidMount() {
		let that = this;
		window.addEventListener(
			'message',
			function(event) {
				// 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
				var loc = event.data;
				if (loc && loc.module == 'locationPicker') {
					//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
					console.log('location', loc);
					that.handleShowMap();
				}
			},
			false
		);
	}
	handleShowMap = () => {
		console.log(this.state.isShow);
		this.setState({
			isShow: !this.state.isShow
		});
	};
	render() {
		return (
			<div style={{ height: '100vh' }} onClick={this.handleShowMap}>

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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Map));
