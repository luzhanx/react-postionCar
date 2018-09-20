# react-postionCar
定位车

```
/**
 * 预约列表接口
 * status 状态  0全部 1 待处理 2 进行中 3 已完成
 * page   下一页
 * limit  获取条数
 */
Api(status, page, limit)

{
  "code": 1,                            // 成功状态
	"list": [
		{
			"id": 11,							            // ID
			"license_plate": "粤B - KY666",   // 车牌号
			"personnel": "马飞飞",            // 服务人员
			"phone": "13076248607",           // 联系电话
			"date": "2018.09.06",             // 预约时间
			"status": 1                       // 当前状态   1 待处理 2 进行中 3 已完成
		},
  "page": 1,                            // 当前页
}

```
