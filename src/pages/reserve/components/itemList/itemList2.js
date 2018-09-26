import { PullToRefresh, ListView } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

import './index.less';

const NUM_ROWS = 20;

function genData(pIndex = 0, num = NUM_ROWS) {
	const sectionID = [];
	for (let i = 0; i < num; i++) {
		sectionID.push(`row - ${pIndex * num + i}`);
	}

	return sectionID;
}

class ItemList extends React.Component {
	constructor(props) {
		super(props);
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2
		});

		this.state = {
			dataSource,
			refreshing: true,
			isLoading: true,
			height: document.documentElement.clientHeight,
			pageIndex: 0,
			currentIndex: 0,
			list: [],
			rData: []
		};
	}

	componentDidMount() {
		let that = this;

		const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

		let id =
			this.props.status === 0 ? 'reserve' : this.props.status === 1 ? '1' : this.props.status === 2 ? '2' : '3';

		Axios.get(`/api/${id}.json`, { params: { id: id } }).then((result) => {
			let res = result.data;

			this.state.rData = genData(this.state.pageIndex++, res.list.length);

			that.setState({
				list: res.list,
				dataSource: this.state.dataSource.cloneWithRows(this.state.rData),
				height: hei,
				refreshing: false,
				isLoading: false
			});
		});
	}

	// 下拉刷新
	onRefresh = () => {
		let that = this;
		that.state.currentIndex = 0;
		this.setState({ refreshing: true, isLoading: true });

		this.getWlList((res) => {
			if (res.code === 1) {
				that.state.pageIndex = 0;
				that.rData = genData(that.state.pageIndex, res.list.length);

				that.setState({
					dataSource: that.state.dataSource.cloneWithRows(that.rData),
					refreshing: false,
					isLoading: false,
					list: res.list
				});
			}
		});
	};

	// 上拉加载
	onEndReached = (event) => {
		// 加载完请求的20个数据
		// hasMore: from backend data, indicates whether it is the last page, here is false
		// HasMe:从后端数据，指示它是否是最后一页，这里是false

		if (this.state.isLoading && !this.state.hasMore) {
			return;
		}

		this.setState({ isLoading: true });

		let that = this;
		console.log('reach end', event);
		// this.getWlList((res) => {
		// 	console.log(res);
		// 	if (res.code === 1) {
		// 		that.rData = [ ...this.state.rData, ...genData(that.state.pageIndex++, res.list.length) ];

		// 		that.setState({
		// 			dataSource: this.state.dataSource.cloneWithRows(this.state.rData),
		// 			isLoading: false,
		// 			list: [ ...that.state.list, ...res.list ]
		// 		});
		// 	}
		// });
	};

	render() {
		const separator = (sectionID, rowID) => (
			<div
				key={`${sectionID}-${rowID}`}
				style={{
					backgroundColor: '#F5F5F9',
					height: 8,
					borderTop: '1px solid #ECECED',
					borderBottom: '1px solid #ECECED'
				}}
			/>
		);
		const row = (rowData, sectionID, rowID, highlightRow) => {
			const item = this.state.list[this.state.currentIndex++];
			console.log(this.state.currentIndex, this.props.status);
			// console.log(this.state.rData);
			return (
				<div key={rowID} className="item">
					<div className="license_plate">{item.license_plate}</div>
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

					<div className={`status ${item.status === 1 ? 'treated' : item.status === 2 ? 'conduct' : ''}`}>
						待处理
					</div>
				</div>
			);
		};
		return (
			<div className="tabPage">
				<ListView
					key={'cccc'}
					ref={(el) => (this.lv = el)}
					dataSource={this.state.dataSource}
					renderHeader={() => <span>Pull to refresh</span>}
					renderFooter={() => (
						<div style={{ padding: 30, textAlign: 'center' }}>
							{this.state.isLoading ? 'Loading...' : 'Loaded'}
						</div>
					)}
					renderRow={row}
					renderSeparator={separator}
					style={{
						height: this.state.height
					}}
					pullToRefresh={<PullToRefresh refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
					onEndReached={this.onEndReached}
					pageSize={2}
					useBodyScroll={true}
				/>
			</div>
		);
	}

	getWlList(callback) {
		let url =
			this.props.status === 0 ? 'reserve' : this.props.status === 1 ? '1' : this.props.status === 2 ? '2' : '3';

		Axios.get(`/api/${url}.json`, {
			params: {
				status: this.props.status
			}
		}).then((result) => {
			let res = result.data;
			callback(res);
		});
	}
}

export default ItemList;
