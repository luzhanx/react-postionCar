import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import posImg from '@/assets/img/pos.png';
import avatarImg from '@/assets/img/avatar.jpg';
import phoneImg from '@/assets/img/phone.png';
import { SetIncludeMap } from './store/action';
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
	componentWillMount() {
		console.log('订单ID是', this.props.match.params.id);
	}
	componentDidMount() {
		// 是否已经载入了腾讯地图js
		if (this.props.isIncludeMap) {
			console.log('已经加载了腾讯地图');
		} else {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'https://map.qq.com/api/js?v=2.exp&callback=init';
			document.body.appendChild(script);
			this.props.dispatch(SetIncludeMap(true));
		}

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

		Axios.get('https://vehicle-location.xtow.net/index/Index/location').then((result) => {
			let res = result.data.result;

			if (res.lat === lat && res.lng === lng) {
				console.log(res, '坐标一样, 不改变');
			} else {
				lat = res.lat;
				lng = res.lng;
				map.panTo(new window.QMap.LatLng(lat, lng));
				marker.setPosition(map.getCenter());
				console.log(res);
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
					<img src={avatarImg} className="avatar" alt="" />

					<div className="content">
						<div className="nickname">林先生</div>
						<div className="phone">联系电话：13076248607</div>
					</div>
					<a href="tel:13076248607">
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
