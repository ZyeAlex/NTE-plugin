## 目录

### setting 
> 存放所有与 `config` `data` 交互逻辑，并存储其状态
```js
import setting from '#setting'
```
| 属性  |说明  | 示例 |
|---|---|---|
|setting.config|<font color=bluesky>配置</font>|请参考[config](./config/default.yaml)|
|setting.yunzaiPath|yunzai地址||
|setting.path|NTE地址||


| 方法 | 说明  |参数|返回值 |
|---|---|---|---|
|setting.getHeroId(heroName) |根据名称获取角色ID | 角色名/角色昵称/角色ID|角色ID / undefined|
|setting.getData(yamlPath) | 获取YAML数据 | yaml地址 |  
|setting.setData(yamlPath,data) | 保存YAML数据 | yaml地址 , 数据 |  


### app
```js
import setting from '#setting' // 引入setting配置
import plugin from '#plugin' // 引入plugin函数
import render from '#render' // 引入rander函数
```

```js
export const Test = plugin({
    name: '[异环助手]测试模块',
    event: 'message',
    priority: 101,
    rule:[{
            reg: `^${setting.rulePrefix}?测试$`,
            fnc: test
        }]
})

function test(e,reg){
    logger.info(reg) // /^~?测试$/
}

```