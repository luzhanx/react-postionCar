/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
const data = [
	{
		title: '粤F 888888'
	},
	{
		title: '粤A 999999'
	}
];
const NUM_ROWS = 20;
let pageIndex = 0;

const allData = [];
let index = 0;

function genData(pIndex = 0) {
	const sectionID = [];

	for (let i = 0; i < NUM_ROWS; i++) {
		sectionID.push(`row - ${pIndex * NUM_ROWS + i}`);
	}
	return sectionID;
}

class Test extends React.Component {
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
			useBodyScroll: false
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
		const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;

		setTimeout(() => {
			let data = genData();

			this.rData = data;
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.rData),
				height: hei,
				refreshing: false,
				isLoading: false
			});
		}, 1500);
	}

	// 上拉刷新
	onRefresh = () => {
		this.setState({ refreshing: true, isLoading: true });
		// simulate initial Ajax
		setTimeout(() => {
			this.rData = genData();
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.rData),
				refreshing: false,
				isLoading: false
			});
		}, 600);
	};

	// 下拉加载
	onEndReached = (event) => {
		// 加载完请求的20个数据
		if (this.state.isLoading && !this.state.hasMore) {
			return;
		}
		console.log('reach end', event);
		this.setState({ isLoading: true });
		setTimeout(() => {
			this.rData = [ ...this.rData, ...genData(++pageIndex) ];
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.rData),
				isLoading: false
			});
		}, 1000);
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
			console.log(index);
			const obj = allData[index++];

			return (
				<div
					key={rowID}
					style={{
						padding: '0 15px',
						backgroundColor: 'white'
					}}
				>
					item
				</div>
			);
		};
		return (
			<div>
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
}

export default Test;
