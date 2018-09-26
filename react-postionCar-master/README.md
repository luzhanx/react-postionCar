# react-postionCar
#### [定位车公众号网页](https://luzhanx.github.io/react-postionCar/#/)

#### [React Antd](https://mobile.ant.design/components)

#### [API文档](https://www.kancloud.cn/xtuo/vehicle-location/770389)


#### [引用腾讯地图](https://lbs.qq.com/javascript_v2/index.html)
```javascript
<script charset="utf-8" src="https://map.qq.com/api/js?v=2.exp"></script>
<script>window.QMap = qq.maps</script>
config\webpack.config.dev.js 加入
	externals:{
    'QMap': 'qq.maps'
	},
	项目直接 window.QMap
```
```javascript
/**
 * 预约列表接口
 * status 状态  0全部 1 待处理 2 进行中 3 已完成
 * page   下一页
 * limit  获取条数
 */
Api(status, page, limit)

{
  "code": 1,                        // 成功状态
  "list": [
  {
   "id": 11,                        // ID
   "license_plate": "粤B - KY666",  // 车牌号
   "personnel": "马飞飞",           // 服务人员
   "phone": "13076248607",          // 联系电话
   "date": "2018.09.06",            // 预约时间
   "status": 1                      // 当前状态   1 待处理 2 进行中 3 已完成
  },
  "page": 1,                         // 当前页
}

```
	"proxy": {
		"/visit": {
			"target": "https://vehicle-location.xtow.net",
			"changeOrigin": true,
			"pathRewrite": {
				"^/visit": "/"
			}
		}
	}
