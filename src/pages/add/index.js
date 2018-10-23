import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { InputItem, DatePicker, List, Picker, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import Axios from 'axios';
// import wx from 'weixin-js-sdk';

import chepais from './chepai';
import './index.less';

const codeSendMin = 60;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
	moneyKeyboardWrapProps = {
		onTouchStart: (e) => e.preventDefault()
	};
}

// 格式化时间 yyyy-MM-dd HH:MM:SS
const getNowFormatDate = (date) => {
	console.log(date);
	var seperator1 = '-';
	var seperator2 = ':';
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = '0' + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = '0' + strDate;
	}
	var currentdate =
		date.getFullYear() +
		seperator1 +
		month +
		seperator1 +
		strDate +
		' ' +
		date.getHours() +
		seperator2 +
		date.getMinutes() +
		seperator2 +
		date.getSeconds();
	return currentdate;
};

//车牌号验证方法
function isVehicleNumber(vehicleNumber) {
	var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;

	var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;

	if (vehicleNumber.length === 7) {
		return creg.test(vehicleNumber);
	} else if (vehicleNumber.length === 8) {
		return xreg.test(vehicleNumber);
	} else {
		return false;
	}
}
class Add extends Component {
	constructor(props) {
		super(props);

		document.title = '预约详情';
		this.state = {
			file: '',
			upImage: '',
			chepai: [ '粤', 'B' ],
			countdown: codeSendMin,
			sendCodeText: '发送验证码',
			isShowMap: false,
			location: {
				poiname: '点击选择'
			}
		};
	}

	componentWillMount() {
		let that = this;

		window.addEventListener(
			'message',
			function(event) {
				// 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
				var loc = event.data;
				if (loc && loc.module === 'locationPicker') {
					//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
					console.log('location', loc);
					that.setState({
						location: loc
					});
					that.handleOpenMap();
				}
			},
			false
		);
	}
	Map = () => {
		return (
			<iframe
				title="mapIframe"
				className={this.state.isShowMap ? 'show' : 'hide'}
				style={{
					position: 'fixed',
					width: '100%',
					height: '100vh'
				}}
				src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
			/>
		);
	};

	// 打开腾讯地图
	handleOpenMap = () => {
		this.setState({
			isShowMap: !this.state.isShowMap
		});
	};
	componentDidMount() {}

	// 选择上传图片
	handleUpImage = (e) => {
		// console.log(e.target.value);
		let that = this;
		let file = e.target.files[0];
		if (!file) {
			return;
		}
		var reads = new FileReader();
		reads.readAsDataURL(e.target.files[0]);
		reads.onload = function(e) {
			that.setState({
				upImage: this.result,
				file: file
			});
		};
	};

	// 开始发送验证码
	settime = (val) => {
		let that = this;
		let countdown = that.state.countdown;

		if (countdown === 0) {
			that.setState({
				countdown: codeSendMin,
				sendCodeText: '发送验证码'
			});
		} else {
			// val.setAttribute('disabled', true);
			// val.value = '重新发送(' + countdown + ')';
			console.log(countdown);
			that.setState({
				sendCodeText: `重新发送 ${countdown}s`,
				countdown: --countdown
			});
			setTimeout(function() {
				that.settime(val);
			}, 1000);
		}
	};
	// 改变车牌
	onChepaiChange = (value) => {
		console.log(value);
		this.setState({
			chepai: value
		});
	};
	// 格式化车牌号
	chepaiFormat = (labels) => {
		return (
			<div className="chepai_text">
				<div className="chepai_item">{labels[0]}</div>
				<div className="chepai_item">{labels[1]}</div>
			</div>
		);
	};
	// 发送验证码
	handleSendCode = () => {
		let phoneVal = this.phone.state.value.replace(/\s+/g, '');

		// 倒计时的时候不允许点击
		if (this.state.countdown < codeSendMin) {
			Toast.fail('一分钟内容只能发送一次', 1.5);
			return;
		}
		if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(phoneVal)) {
			Toast.fail('手机号码不正确', 1.5);
			console.log(phoneVal, '手机号码不正确');
			return;
		}
		Toast.loading('发送验证码中');
		Axios.get('https://vehicle-location.xtow.net/index/Login/sendSmsCode', {
			params: {
				phone: phoneVal
			}
		})
			.then((result) => {
				let res = result.data;

				if (res.code === 0) {
					Toast.success(res.msg, 1);
				} else {
					Toast.success(res.msg, 1);
				}
				console.log(result);
			})
			.catch((e) => {
				console.log(e);
			});

		this.settime(codeSendMin);
		console.log('sendcode');
	};
	// 预约时间
	onDateChange = (value) => {
		console.log(value);
		this.setState({
			appoint_time: value
		});
	};

	// 检验数据
	checkResult() {
		let file = this.state.file;
		let upImage = this.state.upImage;
		let arrear = this.arrear.state.value;
		let contact = this.contact.state.value;
		let plate_number = this.state.chepai[0] + this.state.chepai[1] + this.chepai_num.state.value;
		let phone = this.phone.state.value.replace(/\s+/g, '');
		let address = this.address.state.value;
		let appoint_time = this.state.appoint_time;
		let code = this.code.state.value;
		let location = this.state.location;

		if (!upImage && file) {
			return { status: false, msg: '请上传图片' };
		}

		if (!code || code === '') {
			return { status: false, msg: '请输入验证码' };
		}

		if (!arrear || arrear === '') {
			return { status: false, msg: '身份证格式错误' };
		}

		if (!contact || contact === '') {
			return { status: false, msg: '联系人格式不正确' };
		}

		if (!plate_number || plate_number === '' || !isVehicleNumber(plate_number)) {
			return { status: false, msg: '车牌号码格式不正确' };
		}

		if (!appoint_time || appoint_time === '') {
			return { status: false, msg: '请选择预约时间' };
		}

		if (!address || address === '') {
			return { status: false, msg: '详细地址不能为空' };
		}

		if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)) {
			return { status: false, msg: '手机号码格式不正确' };
		}
		if (location.poiname === '点击选择') {
			return { status: false, msg: '点击选择取车地址' };
		}
		plate_number = this.state.chepai[0] + this.state.chepai[1] + ' - ' + this.chepai_num.state.value;

		let formatData = {
			arrear: arrear, // 身份证后四位数
			contact: contact, // 联系人
			plate_number: plate_number, // 车牌号
			phone: phone, // 联系电话
			address: address, // 取车地址
			appoint_time: getNowFormatDate(appoint_time), // 取车时间
			code: code, // 短信验证码,
			location: location
		};
		console.log(formatData);
		return {
			status: true,
			msg: '数据验证通过',
			formatData,
			img: file
		};
	}

	// 立即预约
	submit = () => {
		// let { contact, arrear, chepai, plate_number, phone, address, appoint_time, code } = this.state;
		let that = this;
		let checkResult = this.checkResult();

		if (!checkResult.status) {
			Toast.fail(checkResult.msg, 1.5);
			return;
		}

		let formData = new FormData(); // 创建form对象
		formData.append('img', checkResult.img); // 通过append向form对象添加数据,可以通过append继续添加数据
		formData.append('arrear', checkResult.formatData.arrear);
		formData.append('contact', checkResult.formatData.contact);
		formData.append('plate_number', checkResult.formatData.plate_number);
		formData.append('phone', checkResult.formatData.phone);
		formData.append('address', checkResult.formatData.address);
		formData.append('appoint_time', checkResult.formatData.appoint_time);
		formData.append('code', checkResult.formatData.code);

		let config = {
			headers: { 'Content-Type': 'multipart/form-data' }
		};

		Axios.post('/index/Order/add', formData, config).then(({ data }) => {
			console.log(data);
			if (data.code === 0) {
				const id = data.result.id;
				Toast.success(data.msg, 2, () => {
					that.props.history.push(`/reserve/paySubmit/id/${id}`);
				});
			} else {
				return Toast.fail(data.msg, 2);
			}
		});
	};

	render() {
		// const { getFieldProps } = this.props.form;

		return (
			<div className="addPage">
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
							{this.state.upImage === '' ? <div className="addCss" /> : ''}
						</div>
					</div>
					<div className="title">
						<div className="key">身份证后四位数</div>
						<div className="value">
							<InputItem
								type={'money'}
								ref={(el) => (this.arrear = el)}
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
						<div className="chepai">
							<Picker
								data={chepais}
								cascade={false}
								value={this.state.chepai}
								onChange={this.onChepaiChange}
								format={this.chepaiFormat}
							>
								<List.Item arrow="" />
							</Picker>
						</div>
						<div className="chepainum">
							<InputItem placeholder={'车牌编号'} clear ref={(el) => (this.chepai_num = el)} />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="key">联系人</div>
					<div className="value">
						<InputItem clear ref={(el) => (this.contact = el)} />
					</div>
				</div>
				<div className="row">
					<div className="key">预约时间</div>
					<div className="value yuyuevalue">
						<DatePicker mode="datetime" value={this.state.appoint_time} onChange={this.onDateChange}>
							<List.Item arrow="horizontal" />
						</DatePicker>
					</div>
				</div>
				<div className="row">
					<div className="key">取车地址</div>
					<div className="value" onClick={this.handleOpenMap}>
						<div className="handleposi am-list-item">{this.state.location.poiname}</div>
						<div className="no">
							<List.Item arrow="horizontal" />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="key">详细地址</div>
					<div className="value">
						<InputItem clear ref={(el) => (this.address = el)} />
					</div>
				</div>
				<div className="row">
					<div className="key">手机号</div>
					<div className="value">
						<InputItem type={'phone'} clear ref={(el) => (this.phone = el)} />
						<div className="sendCode" onClick={this.handleSendCode}>
							{this.state.sendCodeText}
						</div>
					</div>
				</div>
				<div className="row">
					<div className="key">验证码</div>
					<div className="value">
						<InputItem type={'number'} clear ref={(el) => (this.code = el)} />
					</div>
				</div>
				<div className="row">
					<div className="key nopl">
						<div>同城上线验车</div>
						<Link to="/help/id/2" className="link">
							了解详情
						</Link>
					</div>
				</div>
				<div className="submit" onClick={this.submit}>
					立即预约
				</div>
				<div className="tip">
					<div>点击提交预约则默认为同意</div>
					<Link to="/help/id/1" className="link">
						《华基平台协议》
					</Link>
				</div>
				{this.Map()}
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(createForm()(Add)));
