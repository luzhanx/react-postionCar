import { PullToRefresh, ListView } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

import './index.less';

const NUM_ROWS = 20;

let listTreated = [];

function genData(pIndex = 0, num = NUM_ROWS) {
	const sectionID = [];
	// let num = num
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
			useBodyScroll: false,
			listAll: [], // 全部
			listTreated: [], // 待处理
			listConduct: [], // 进行中
			listCompleted: [], // 已完成,
			pageIndex: 0,
			currentIndex: 0,
			currentData:
				props.status === 0
					? 'listAll'
					: props.status === 1
						? 'listTreated'
						: props.status === 2 ? 'listConduct' : props.status === 3 ? 'listCompleted' : ''
		};
	}

	componentDidUpdate() {
		if (this.state.useBodyScroll) {
			document.body.style.overflow = 'auto';
		} else {
			document.body.style.overflow = 'hidden';
		}
	}

	componentDidMount() {
		let that = this;

		const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

		if (this.props.status === 0) {
			this.getWlList((res) => {
				if (res.code === 1) {
					// 获取 sectionID 集合
					that.getList(res.list);
					this.rData = genData(that.state.pageIndex++, res.list.length);
					this.setState({
						dataSource: this.state.dataSource.cloneWithRows(this.rData),
						height: hei,
						refreshing: false,
						isLoading: false
					});
				}
			});
		}
	}

	// 下拉刷新
	onRefresh = () => {
		let that = this;

		this.setState({ refreshing: true, isLoading: true });
		this.getWlList((res) => {
			if (res.code === 1) {
				that.getList(res.list, () => {
					that.state.pageIndex = 0;
					that.state.currentIndex = 0;
					that.rData = genData(that.state.pageIndex++, res.list.length);
					console.log(that.rData);
					that.setState({
						dataSource: that.state.dataSource.cloneWithRows(that.rData),
						refreshing: false,
						isLoading: false
					});
				});
			}
		});
	};

	// 上拉加载
	onEndReached = (event) => {
		// 加载完请求的20个数据
		if (this.state.isLoading && !this.state.hasMore) {
			return;
		}

		this.setState({ isLoading: true });
		let that = this;
		this.getWlList((res) => {
			if (res.code === 1) {
				that.getList(res.list, () => {
					that.rData = [
						...this.rData,
						...genData(that.state.pageIndex === 0 ? 1 : that.state.pageIndex++, res.list.length)
					];
					console.log(that.rData);
					that.setState({
						dataSource: this.state.dataSource.cloneWithRows(this.rData),
						isLoading: false
					});
				});
			}
		});
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

		const row = (rowData, sectionID, rowID) => {
			// console.log(this.state[this.state.currentData]);
			const item = this.state[this.state.currentData][this.state.currentIndex++];

			console.log(rowData);
			console.log(item, this.state.currentData, this.state.currentIndex);
			return (
				<div key={rowID} className="item">
					{item.status === 1 ? '待处理' : item.status === 2 ? '进行中' : item.status === 3 ? '已完成' : ''}
				</div>
			);
		};
		return (
			<div className="tabPage">
				<ListView
					key={'1'}
					ref={(el) => (this.lv = el)}
					dataSource={this.state.dataSource}
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
					pageSize={5}
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
		})
			.then((result) => {
				let res = result.data;
				callback(res);
			})
			.catch((e) => {
				console.log('网络异常');
			});
	}

	getList(data, callback = Function) {
		let that = this;
		console.log(this.state.listAll !== [] ? [ ...this.state.listAll, ...data ] : data);
		// 全部列表先渲染
		that.setState(
			{
				listAll: this.state.listAll !== [] ? [ ...this.state.listAll, ...data ] : data
			},
			() => {
				// 再分类
				let listTreated = [];
				let listConduct = [];
				let listCompleted = [];

				data.forEach((item) => {
					switch (item.status) {
						case 1:
							listTreated.push(item);
							break;
						case 2:
							listConduct.push(item);
							break;
						case 3:
							listCompleted.push(item);
							break;
						default:
							break;
					}
				});
				listTreated = that.state.pageIndex !== 0 ? [ ...this.state.listTreated, ...listTreated ] : listTreated;
				listConduct = that.state.pageIndex !== 0 ? [ ...this.state.listConduct, ...listConduct ] : listConduct;
				listCompleted =
					that.state.pageIndex !== 0 ? [ ...this.state.listCompleted, ...listCompleted ] : listCompleted;
				callback();
				// that.setState(
				// 	{
				// 		listTreated:
				// 			that.state.pageIndex !== 0 ? [ ...this.state.listTreated, ...listTreated ] : listTreated,
				// 		listConduct:
				// 			that.state.pageIndex !== 0 ? [ ...this.state.listConduct, ...listConduct ] : listConduct,
				// 		listCompleted:
				// 			that.state.pageIndex !== 0
				// 				? [ ...this.state.listCompleted, ...listCompleted ]
				// 				: listCompleted
				// 	},
				// 	() => {
				// 		callback();
				// 	}
				// );
			}
		);
	}
}

export default ItemList;
