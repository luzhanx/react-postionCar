import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import posImg from '@/assets/img/pos.png';
import avatarImg from '@/assets/img/avatar.jpg';
import phoneImg from '@/assets/img/phone.png';
import { SetIncludeMap } from './store/action';

import './index.less';

class Map extends Component {
	constructor(props) {
		super(props);
		document.title = '服务人员定位';
	}
	componentWillMount() {}
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
			return;
		}

		setTimeout(() => {
			var map = new window.QMap.Map(document.getElementById('mapPage'), {
				center: new window.QMap.LatLng(24.79188, 113.60425), // 地图的中心地理坐标。
				zoom: 15 // 地图的中心地理坐标。
			});
			var anchor = new window.QMap.Point(10, 30),
				size = new window.QMap.Size(20, 40),
				origin = new window.QMap.Point(0, 0),
				icon = new window.QMap.MarkerImage(posImg, size, origin, anchor);
			var marker = new window.QMap.Marker({
				icon: icon,
				map: map,
				position: map.getCenter()
			});
			let mapY = 113.60426;
			setInterval(function() {
				//经纬度信息
				mapY = mapY - 0.0002;
				map.panTo(new window.QMap.LatLng(24.79188, mapY));
				marker.setPosition(map.getCenter());
			}, 1000);
		}, 500);
	}

	render() {
		return (
			<div className="mapPage">
				<div id="mapPage" />
				<div className="info">
					<img src={avatarImg} className="avatar" alt="" />

					<div className="content">
						<div className="nickname">林先生</div>
						<div className="phone">联系电话：1313131313</div>
					</div>
					<a href="tel:13076248607">
						<img src={phoneImg} className="phonepng" alt="" />
					</a>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (store) => {
	return {
		isIncludeMap: store.map.isIncludeMap
	};
};
export default connect(mapStateToProps)(withRouter(Map));
