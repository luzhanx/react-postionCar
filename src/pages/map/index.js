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
				<h1>Map</h1>
			</div>
		);
	}
	getLocation() {
		//判断是否支持 获取本地位置
		if (navigator.geolocation) {
			// alert('浏览器不支持定位' + navigator.geolocation);
			navigator.geolocation.getCurrentPosition(this.showPosition);
		} else {
			alert('浏览器不支持定位' + navigator.geolocation);
		}
	}
	showPosition(position) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		let latlng;
		//调用地图命名空间中的转换接口   type的可选值为 1:GPS经纬度，2:搜狗经纬度，3:百度经纬度，4:mapbar经纬度，5:google经纬度，6:搜狗墨卡托
		window.QMap.convertor.translate(new window.QMap.LatLng(lat, lng), 1, function(res) {
			//取出经纬度并且赋值
			latlng = res[0];

			var map = new window.QMap.Map(document.getElementById('qqmap'), {
				center: latlng,
				zoom: 18
			});
			//设置marker标记
			var marker = new window.QMap.Marker({
				map: map,
				position: latlng
			});
		});
	}
	componentDidMount() {
		//定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
		// var map = new window.QMap.Map(document.getElementById('qqmap'), {
		// 	center: new window.QMap.LatLng(24.8035, 113.61041), // 地图的中心地理坐标。
		// 	zoom: 13 // 地图的中心地理坐标。
		// });

		this.getLocation();
	}

	render() {
		return <div id="qqmap" style={{ width: '100%', height: '100vh' }} />;
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
