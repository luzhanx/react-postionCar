import { PullToRefresh, Toast } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import './index.less';
class ItemList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			down: true,
			height: document.documentElement.clientHeight,
			data: [],
			hasMore: true,
			page: 1,
			limit: 10
		};
	}

	componentDidMount() {
		let that = this;
		const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
		let page = this.state.page;
		let limit = this.state.limit;
		let status = this.props.status;
		Toast.loading('数据加载中...');

		Axios.get(`/index/order/index`, {
			params: { page: page, limit: limit, status: status }
		}).then((result) => {
			let res = result.data;
			if (res.code === 0) {
				that.setState({
					data: res.data,
					// height: hei,
					refreshing: false,
					page: ++page
				});
				if(res.data.length < limit){
					that.setState({
						hasMore: false
					});
				}
				Toast.hide();
			}else if(res.code === 2){
				window.location.href = '/index/login/weixin'
			}
		});
	}
	// 上拉加载
	onEndReached = (event) => {
		// 加载完请求的10个数据
		// HasMe:从后端数据，指示它是否是最后一页，这里是false
		if(!this.state.hasMore){
			return;
		}

		if (this.state.refreshing && !this.state.hasMore) {
			return;
		}

		let that = this;
		let page = this.state.page;
		let limit = this.state.limit;
		let status = this.props.status;

		Axios.get(`/index/order/index`, {
			params: { page: page, limit: limit, status: status }
		}).then((result) => {
			let res = result.data;

			if (res.code === 0) {
				that.setState({
					refreshing: false,
					data: [ ...that.state.data, ...res.data ],
					page: ++page
				});
				if(res.data.length < limit){
					that.setState({
						hasMore: false
					});
				}
			}
		});
	};
	render() {
		return (
			<div>
				<PullToRefresh
					damping={60}
					ref={(el) => (this.ptr = el)}
					style={{
						height: this.state.height,
						overflow: 'auto'
					}}
					indicator={{ deactivate: '上拉可以刷新' }}
					direction={'up'}
					refreshing={this.state.refreshing}
					onRefresh={this.onEndReached}
				>
					<div className="tabPage">
						{/* {this.state.data.length === 0 ? (
							// <Link className="tttip" to={`/add`}>点击添加预约</Link>
						):null} */}
						{this.state.data.map((item, rowID) => (
							<div key={rowID} className="item">
								<div className="license_plate">
									<div className="title">{item.plate_number}</div>
									{item.status === 1 || item.status === 2? (
										<Link to={`/map/id/${item.id}`} className="toMap">
											查看服务人员位置
										</Link>
									) : (
										''
									)}
								</div>
								<Link to={`/reserve/detail/id/${item.id}`} className="info">
									<div className="row">
										<div className="key">服务人员：</div>
										<div className="value">{item.personnel}</div>
									</div>
									<div className="row">
										<div className="key">联系电话：</div>
										<div className="value">{item.tel}</div>
									</div>
									<div className="row">
										<div className="key">预约时间：</div>
										<div className="value">{item.appoint_time}</div>
									</div>
								</Link>

								<div
									className={`status ${item.status === 1
										? 'treated'
										: item.status === 2 ? 'conduct' : ''}`}
								>
									{item.status === 1
										? '进行中'
										: item.status === 2 ? '已完成' : '待处理'}
								</div>
							</div>
						))}
						{/* {this.state.hasMore === false ? <div className="tip">无更多记录</div> : <div />} */}
					</div>
				</PullToRefresh>
			</div>
		);
	}
}

export default ItemList;
