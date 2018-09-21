import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { InputItem, DatePicker, List, PickerView } from 'antd-mobile';
import { createForm } from 'rc-form';

import './index.less';
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
	moneyKeyboardWrapProps = {
		onTouchStart: (e) => e.preventDefault()
	};
}

class Add extends Component {
	constructor(props) {
		super(props);

		document.title = '预约详情';
		this.state = {
			upImage: ''
		};
	}

	handleUpImage = (e) => {
		console.log(e.target.value);
		let that = this;

		var reads = new FileReader();
		reads.readAsDataURL(e.target.files[0]);
		reads.onload = function(e) {
			console.log(this.result);
			// document.getElementById('show').src=this.result;
			that.setState({
				// upImage: this.result
				upImage: this.result
			});
		};
		this.setState({
			// upImage: e.target.files[0]
			upImage: e.target.value
		});
	};
	render() {
		const { getFieldProps } = this.props.form;

		return (
			<div className="add">
				<div className="roww">
					<div className="title">上传资料</div>
					<div className="autoRow">
						<div className="addImg" style={{ backgroundImage: `url(${this.state.upImage})` }}>
							<input
								accept="image/*"
								type="file"
								onChange={this.handleUpImage}
								ref={(el) => (this.upImage = el)}
								className="imgFile"
							/>
							<div className="addCss" />
						</div>
					</div>
					<div className="title">
						<div className="key">身份证后四位数</div>
						<div className="value">
							<InputItem
								{...getFieldProps('sfz', {
									normalize: (v) => {
										if (!v) {
											return v;
										}
										console.log(v);
										if (v === '.') {
											return '';
										}
										return v.replace(/\./g, '');
									}
								})}
								type={'money'}
								ref={(el) => (this.inputRef = el)}
								clear
								maxLength={4}
								moneyKeyboardWrapProps={moneyKeyboardWrapProps}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="key">车牌</div>
					<div className="value">
						<InputItem {...getFieldProps('chepai')} clear ref={(el) => (this.chepai = el)} />
					</div>
				</div>
				<div className="row">
					<div className="key">联系人</div>
					<div className="value">
						<InputItem {...getFieldProps('lianxiren')} clear ref={(el) => (this.lianxiren = el)} />
					</div>
				</div>
				<div className="row">
					<div className="key">预约时间</div>
					<div className="value">
						<DatePicker value={this.state.date} onChange={(date) => this.setState({ date })}>
							<List.Item arrow="horizontal" />
						</DatePicker>
					</div>
				</div>
				<div className="row">
					<div className="key">取车地址</div>
					<div className="value">
						<InputItem {...getFieldProps('address')} clear ref={(el) => (this.address = el)} />
					</div>
				</div>
				<div className="row">
					<div className="key">手机号</div>
					<div className="value">
						<InputItem {...getFieldProps('phone')} type={'phone'} clear ref={(el) => (this.phone = el)} />
					</div>
				</div>
				<div className="row">
					<div className="key">验证码</div>
					<div className="value">
						<InputItem {...getFieldProps('code')} clear ref={(el) => (this.code = el)} />
					</div>
				</div>
				<div className="row">
					<div className="key nopl">
						<div>同城上线验车</div>
						<Link to="/details" className="link help">
							了解详情
						</Link>
					</div>
				</div>
				<div className="submit">立即预约</div>
				<div className="tip">
					<div>点击提交预约则默认为同意</div>
					<Link to="/agreement" className="link">
						《华基平台协议》
					</Link>
				</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(createForm()(Add)));
