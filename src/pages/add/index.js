import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { InputItem, List, Picker, Toast } from 'antd-mobile';
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
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = '0' + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = '0' + strDate;
	}
	var currentdate = [];
	currentdate[0] = date.getFullYear();
	currentdate[1] = month;
	currentdate[2] = strDate;

	return currentdate;
};
let years = [];
let currentYear = getNowFormatDate(new Date());
for(var i=0; i<30; i++){
	let year =  parseInt(currentYear[0], 10) + i;

	years.push({
		value: year,
		label: year + '年'
	})
}

let dateArr = [
	years,
	[
		{
			value: '01',
			label: '1月'
		},
		{
			value: '02',
			label: '2月'
		},
		{
			value: '03',
			label: '3月'
		},
		{
			value: '04',
			label: '4月'
		},
		{
			value: '05',
			label: '5月'
		},
		{
			value: '06',
			label: '6月'
		},
		{
			value: '07',
			label: '7月'
		},
		{
			value: '08',
			label: '8月'
		},
		{
			value: '09',
			label: '9月'
		},
		{
			value: '10',
			label: '10月'
		},
		{
			value: '11',
			label: '11月'
		},
		{
			value: '12',
			label: '12月'
		}
	],
	[
		{
			value: '01',
			label: '1日'
		},
		{
			value: '02',
			label: '2日'
		},
		{
			value: '03',
			label: '3日'
		},
		{
			value: '04',
			label: '4日'
		},
		{
			value: '05',
			label: '5日'
		},
		{
			value: '06',
			label: '6日'
		},
		{
			value: '07',
			label: '7日'
		},
		{
			value: '08',
			label: '8日'
		},
		{
			value: '09',
			label: '9日'
		},
		{
			value: '10',
			label: '10日'
		},
		{
			value: '11',
			label: '11日'
		},
		{
			value: '12',
			label: '12月'
		},
		{
			value: '13',
			label: '13日'
		},
		{
			value: '14',
			label: '14日'
		},
		{
			value: '15',
			label: '15日'
		},
		{
			value: '16',
			label: '16日'
		},
		{
			value: '17',
			label: '17日'
		},
		{
			value: '18',
			label: '18日'
		},
		{
			value: '19',
			label: '19日'
		},
		{
			value: '20',
			label: '20日'
		},
		{
			value: '21',
			label: '21日'
		},
		{
			value: '22',
			label: '22日'
		},
		{
			value: '23',
			label: '23日'
		},
		{
			value: '24',
			label: '24日'
		},
		{
			value: '25',
			label: '25日'
		},
		{
			value: '26',
			label: '26日'
		},
		{
			value: '27',
			label: '27日'
		},
		{
			value: '28',
			label: '28日'
		},
		{
			value: '29',
			label: '29日'
		},
		{
			value: '30',
			label: '30日'
		},
		{
			value: '31',
			label: '31日'
		}
	],
	[
		{
			value: '08:00 - 10:00',
			label: '08:00 - 10:00'
		},
		{
			value: '09:00 - 11:00',
			label: '09:00 - 11:00'
		},
		{
			value: '10:00 - 12:00',
			label: '10:00 - 12:00'
		},
		{
			value: '11:00 - 13:00',
			label: '11:00 - 13:00'
		},
		{
			value: '12:00 - 14:00',
			label: '12:00 - 14:00'
		},
		{
			value: '13:00 - 15:00',
			label: '13:00 - 15:00'
		},
		{
			value: '14:00 - 16:00',
			label: '14:00 - 16:00'
		},
		{
			value: '15:00 - 17:00',
			label: '15:00 - 17:00'
		}
	]
];

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
			chepai: [ '粤', 'A' ],
			countdown: codeSendMin,
			sendCodeText: '发送验证码',
			isShowMap: false,
			address: '',
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
					that.setState({
						location: loc,
						address: loc.poiaddress
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
	componentDidMount() {
		Axios.get('https://vehicle-location.xtow.net/index/login/show').then(({ data }) => {
			if (data.code === 2) {
				window.location.href = '/index/login/weixin?reurl=' + 'add';
			}
		});
	}

	// 选择上传图片
	handleUpImage = (e) => {
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
			// console.log(countdown);
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
		this.setState({
			chepai: value
		});
	};
	// 格式化车牌号
	chepaiFormat = (labels) => {
		return (
			<div className="chepai_text">
				<div className="chepai_item"> {labels[0]} </div> <div className="chepai_item"> {labels[1]} </div>{' '}
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
		let plate_number = this.state.chepai[0] + this.state.chepai[1] + this.state.chepai_num;
		let phone = this.phone.state.value.replace(/\s+/g, '');
		let address = this.address.state.value;
		let appoint_time = this.state.appoint_time[0] + '-' + this.state.appoint_time[1] + '-' + this.state.appoint_time[2] + ' ' + this.state.appoint_time[3];
		let code = this.code.state.value;
		let location = this.state.location;

		if (!upImage && file) {
			return {
				status: false,
				msg: '请添加车辆行驶证'
			};
		}

		if (!code || code === '') {
			return {
				status: false,
				msg: '请输入验证码'
			};
		}

		if (!arrear || arrear === '') {
			return {
				status: false,
				msg: '身份证/机构代码证不能为空'
			};
		}

		if (!contact || contact === '') {
			return {
				status: false,
				msg: '联系人格式不正确'
			};
		}

		if (!plate_number || plate_number === '' || !isVehicleNumber(plate_number)) {
			return {
				status: false,
				msg: '车牌号码格式不正确'
			};
		}

		if (!appoint_time || appoint_time === '') {
			return {
				status: false,
				msg: '请选择预约时间'
			};
		}

		if (!address || address === '') {
			return {
				status: false,
				msg: '详细地址不能为空'
			};
		}

		if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)) {
			return {
				status: false,
				msg: '手机号码格式不正确'
			};
		}
		if (location.poiname === '点击选择') {
			return {
				status: false,
				msg: '点击选择取车地址'
			};
		}
		plate_number = this.state.chepai[0] + this.state.chepai[1] + ' - ' + this.state.chepai_num;

		let formatData = {
			arrear: arrear, // 身份证后四位/机构代码证前六位
			contact: contact, // 联系人
			plate_number: plate_number, // 车牌号
			phone: phone, // 联系电话
			address: address, // 取车地址
			appoint_time: appoint_time, // 取车时间
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
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};

		Axios.post('/index/Order/add', formData, config).then(({ data }) => {
			console.log(data);
			if (data.code === 0) {
				const id = data.result.id;
				Toast.success(data.msg, 2, () => {
					that.props.history.push(`/reserve/paySubmit/id/${id}`);
				});
			} else if (data.code === 2) {
				window.location.href = '/index/login/weixin';
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
					<div className="title"> 上传资料(车辆行驶证) </div>
					<div className="autoRow">
						<div
							className="addImg"
							style={{
								backgroundImage: `url(${this.state.upImage})`
							}}
						>
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
						<div className="key"> 身份证后四位 / 机构代码证前六位 </div>
						<div className="value">
							<InputItem
								type={'money'}
								ref={(el) => (this.arrear = el)}
								clear
								maxLength={6}
								moneyKeyboardWrapProps={moneyKeyboardWrapProps}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="key"> 车牌 </div>
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
							<InputItem
								placeholder={'车牌编号'}
								clear
								onChange={(el) => {
									this.setState({
										chepai_num: el.toUpperCase()
									});
								}}
								value={this.state.chepai_num}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="key"> 联系人 </div>
					<div className="value">
						<InputItem clear ref={(el) => (this.contact = el)} />
					</div>
				</div>
				<div className="row">
					<div className="key"> 预约时间 </div>
					<div className="value yuyuevalue">
						<Picker
							title="预约时间"
							cascade={false}
							data={dateArr}
							cols={5}
							value={this.state.appoint_time}
							indicatorStyle={{ color: 'red' }}
							onChange={this.onDateChange}
							format={()=> {
								var value = this.state.appoint_time;
								if(value){
									return value[0] + '-' + value[1] + '-' + value[2] + ' ' + value[3]
								} else {
									return '';
								}
							}}
						>
							<List.Item arrow="horizontal" />
						</Picker>
					</div>
				</div>
				<div className="row">
					<div className="key"> 取车地址 </div>
					<div className="value" onClick={this.handleOpenMap}>
						<div className="handleposi am-list-item"> {this.state.location.poiname} </div>
						<div className="no">
							<List.Item arrow="horizontal" />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="key"> 详细地址 </div>
					<div className="value">
						<InputItem
							clear
							ref={(el) => (this.address = el)}
							value={this.state.address}
							onChange={(e) => {
								this.setState({
									address: e
								});
							}}
						/>
					</div>
				</div>
				<div className="row">
					<div className="key"> 手机号 </div>
					<div className="value">
						<InputItem type={'phone'} clear ref={(el) => (this.phone = el)} />
						<div className="sendCode" onClick={this.handleSendCode}>
							{this.state.sendCodeText}
						</div>
					</div>
				</div>
				<div className="row">
					<div className="key"> 验证码 </div>
					<div className="value">
						<InputItem type={'number'} clear ref={(el) => (this.code = el)} />
					</div>
				</div>
				<div className="row">
					<div className="key nopl">
						<div> 同城上线验车 </div>
						<Link to="/help/id/2" className="link">
							了解详情
						</Link>
					</div>
				</div>
				<div className="submit" onClick={this.submit}>
					立即预约
				</div>
				<div className="tip">
					<div> 点击提交预约则默认为同意 </div>
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
