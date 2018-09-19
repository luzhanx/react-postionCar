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
			hasMore: false
		};
	}

	componentDidMount() {
		let that = this;
		const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;

		let id =
			this.props.status === 0 ? 'reserve' : this.props.status === 1 ? '1' : this.props.status === 2 ? '2' : '3';
		Toast.loading('数据加载中...');

		Axios.get(`https://luzhanx.github.io/react-postionCar/api/${id}.json`, {
			params: { id: id }
		}).then((result) => {
			let res = result.data;

			that.setState(
				{
					data: res.list,
					height: hei,
					refreshing: false
				},
				() => Toast.hide()
			);
		});
	}
	// 上拉加载
	onEndReached = (event) => {
		// 加载完请求的20个数据
		// HasMe:从后端数据，指示它是否是最后一页，这里是false

		if (this.state.refreshing && !this.state.hasMore) {
			return;
		}

		let that = this;

		let id =
			this.props.status === 0 ? 'reserve' : this.props.status === 1 ? '1' : this.props.status === 2 ? '2' : '3';

		Axios.get(`https://luzhanx.github.io/react-postionCar/api/${id}.json`, { params: { id: id } }).then((result) => {
			let res = result.data;

			that.setState({
				refreshing: false,
				data: [ ...that.state.data, ...res.list ]
			});
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
						{this.state.data.map((item, rowID) => (
							<div key={rowID} className="item">
								<div className="license_plate">
									<div className="title">{item.license_plate}</div>
									{item.status === 2 ? (
										<Link to={`/map/id/${item.id}`} className="toMap">
											查看服务人员位置
										</Link>
									) : (
										''
									)}
								</div>
								<div className="info">
									<div className="row">
										<div className="key">服务人员：</div>
										<div className="value">{item.personnel}</div>
									</div>
									<div className="row">
										<div className="key">联系电话：</div>
										<div className="value">{item.phone}</div>
									</div>
									<div className="row">
										<div className="key">预约时间：</div>
										<div className="value">{item.date}</div>
									</div>
								</div>

								<div
									className={`status ${item.status === 1
										? 'treated'
										: item.status === 2 ? 'conduct' : ''}`}
								>
									待处理
								</div>
							</div>
						))}
						{this.state.hasMore === false ? <div className="tip">无更多记录</div> : <div />}
					</div>
				</PullToRefresh>
			</div>
		);
	}
}

export default ItemList;
