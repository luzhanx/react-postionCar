import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import posImg from '@/assets/img/pos.png';
import phoneImg from '@/assets/img/phone.png';
import { Toast } from 'antd-mobile';

import Axios from 'axios';

import './index.less';

let map = null;
let marker = null;
let time = null;
let lat = 0;
let lng = 0;

class Map extends Component {
	constructor(props) {
		super(props);
		document.title = '服务人员定位';
	}
	state = {
		username: '',
		tel: '',
		avatar: ''
	};
	componentWillMount() {
		console.log('订单ID是', this.props.match.params.id);
	}
	componentDidMount() {
		setTimeout(() => {
			map = new window.QMap.Map(document.getElementById('mapPage'), {
				center: new window.QMap.LatLng(24.79188, 113.60425), // 地图的中心地理坐标。
				zoom: 17 // 地图的中心地理坐标。
			});
			var anchor = new window.QMap.Point(10, 30),
				size = new window.QMap.Size(20, 40),
				origin = new window.QMap.Point(0, 0),
				icon = new window.QMap.MarkerImage(posImg, size, origin, anchor);
			marker = new window.QMap.Marker({
				icon: icon,
				map: map,
				position: map.getCenter()
			});
			this.setMapPos();
		}, 500);
	}
	setMapPos() {
		let that = this;
		let id = this.props.match.params.id;

		Axios.get('/index/Index/location', {
			params: {
				id: id
			}
		}).then((result) => {
			let res = result.data.data;
			that.setState({
				username: res.server.data.username,
				avatar: res.server.data.avatar,
				tel: res.server.data.tel
			});
			if (result.data.code === 0) {
				if (res.local.lat === lat && res.local.lng === lng) {
					console.log(res, '坐标一样, 不改变');
				} else {
					lat = res.local.lat;
					lng = res.local.lng;
					map.panTo(new window.QMap.LatLng(lat, lng));
					marker.setPosition(map.getCenter());
				}
			} else {
				return Toast.fail(result.data.msg, 2);
			}

			time = setTimeout(function() {
				that.setMapPos();
			}, 2000);
		});
	}
	render() {
		return (
			<div className="mapPage">
				<div id="mapPage" />
				<div className="info">
					<img src={this.state.avatar} className="avatar" alt="" />

					<div className="content">
						<div className="nickname">{this.state.username}</div>
						<div className="phone">联系电话：{this.state.tel}</div>
					</div>
					<a href={`tel:${this.state.tel}`}>
						<img src={phoneImg} className="phonepng" alt="" />
					</a>
				</div>
			</div>
		);
	}

	componentWillUnmount() {
		// 退出页面清除计时器
		clearTimeout(time);
	}
}
const mapStateToProps = (store) => {
	return {
		isIncludeMap: store.map.isIncludeMap
	};
};
export default connect(mapStateToProps)(withRouter(Map));
