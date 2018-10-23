import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { Toast } from 'antd-mobile';
import { setHelp, setAgreement } from './store/action';

import './index.less';

class Help extends Component {
	constructor(props) {
		super(props);

		let id = props.match.params.id;
		document.title = id === 1 ? '华基平台协议' : '同城在线验车';

		this.state = {
			html: ''
		};
	}
	componentDidMount() {
		let that = this;

		let id = parseInt(this.props.match.params.id, 10);

		// 如果id是协议1
		if (id === 1) {
			console.log(this.props.agreementHTML.length !== 0);
			if (this.props.agreementHTML.length !== 0) {
				return;
			}
		} else if (id === 2) {
			if (this.props.helpHTML !== '') {
				return;
			}
		}

		Toast.loading('加载中');
		Axios.get('https://vehicle-location.xtow.net/index/index/article', {
			params: {
				id: id
			}
		})
			.then((result) => {
				if (id === 2) {
					that.props.dispatch(setHelp(result.data));
				} else if (id === 1) {
					that.props.dispatch(setAgreement(result.data));
				}
				Toast.hide();
			})
			.catch((e) => {
				console.log(e);
				Toast.fail('网络异常', 1);
			});
	}
	render() {
		const HTML = parseInt(this.props.match.params.id, 10) === 1 ? this.props.agreementHTML : this.props.helpHTML;
		return <div style={{ lineHeight: '18px' }} className="helpPage" dangerouslySetInnerHTML={{ __html: HTML }} />;
	}
}
const mapStateToProps = (store) => {
	console.log(store);
	return {
		helpHTML: store.help.help,
		agreementHTML: store.help.agreement
	};
};
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		func() {
// 			dispatch();
// 		}
// 	};
// };
export default connect(mapStateToProps)(withRouter(Help));
