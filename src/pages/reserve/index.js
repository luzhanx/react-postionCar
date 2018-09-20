import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd-mobile';

import ListAll from './components/itemList/itemList';
import ListTreated from './components/itemList/itemList';
import ListConduct from './components/itemList/itemList';
import ListCompleted from './components/itemList/itemList';

import './index.less';

const tabs = [ { title: '全部' }, { title: '待处理' }, { title: '进行中' }, { title: '已完成' } ];

const tabBarUnderlineStyle = {
	width: '11%',
	left: '7%',
	borderColor: '#5767C8'
};

class Reserve extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return (
			<div className="reserve">
				<Tabs
					tabs={tabs}
					initialPage={0}
					tabBarUnderlineStyle={tabBarUnderlineStyle}
					tabBarActiveTextColor="#5767C8"
					tabBarInactiveTextColor="#6E6E6E"
					onChange={this.tabChange}
					useOnPan={true}
					prerenderingSiblingsNumber={1}
				>
					<ListAll status={0} />
					<ListTreated status={1} />
					<ListConduct status={2} />
					<ListCompleted status={3} />
				</Tabs>
			</div>
		);
	}

	// Tab 切换
	tabChange = (title, index) => {
		tabBarUnderlineStyle.left = `${7 + 25 * index}%`;
	};
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
export default connect(mapStateToProps, mapDispatchToProps)(Reserve);
