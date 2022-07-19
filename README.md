# GraphiQL网关服务

> BP API映射关系 [映射关系](https://iwutong.fe.st.sankuai.com/dfe/graphql/voyager)

![image](https://s3plus.meituan.net/v1/mss_0a7f4c7b6e8342d9985d10a078f28f6f/def-apis-clip/WX20210926-110418%402x.png)
### 测试实例代码

> BP 网关服务 [实例接口](https://iwutong.fe.st.sankuai.com/dfe/graphql/api)

```{
  dimension {
    channel: getDim(dimensionId: "sale_channel") {
      code
      data {
        code: showName
        title: standardValue
      }
    }
    poi: getPoi(poiId: 40335755) {
      code
      data {
        bdName
        poiId
        region
        temperature
        weather
        weatherCode
      }
    }
  }
  queryindex {
    indexs: getIndex(params: {beginDate: 20210917, compareType: 1, dateType: 1, endDate: 20210917, scope: {org: [[1943]]}, statisticsType: "statistics", themeTab: "performance"}) {
      code
      data {
        tableData {
          key: showName
          name: indexName
          unitType
          yoy
          wow
          value
          digit
        }
        tableColumn {
          key
          value
        }
      }
    }
  }
}
```
![image](https://s3plus.meituan.net/v1/mss_0a7f4c7b6e8342d9985d10a078f28f6f/def-apis-clip/WX20210926-110402%402x.png)

