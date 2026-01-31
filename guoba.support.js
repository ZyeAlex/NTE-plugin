import lodash from 'lodash'
import setting from "#setting"
import path from 'path'
import fs from 'fs'
/**
 *  支持锅巴
 *  锅巴插件：https://gitee.com/guoba-yunzai/guoba-plugin.git
 *  组件类型，可参考 https://vvbin.cn/doc-next/components/introduction.html
 *  https://antdv.com/components/overview-cn/
 */

export function supportGuoba() {
  let allGroup = [];
  Bot.gl.forEach((v, k) => { k != 'stdin' && allGroup.push({ label: `${v.group_name}(${k})`, value: k }); });
  let packageJson = JSON.parse(fs.readFileSync(setting.path + '/package.json', 'utf8'));
  return {
    pluginInfo: {
      name: packageJson.name,
      title: packageJson.title,
      author: packageJson.author,
      authorLink: packageJson.authorLink,
      link: packageJson.link,
      description: packageJson.description,
      isV3: true,
      // iconPath: path.join(setting.path, '/resources/common/theme/logo_c.png'),
    },
    // 配置项信息
    configInfo: {
      // 配置项 schemas
      schemas: [],
      // 获取配置数据方法（用于前端填充显示数据）
      getConfigData() {
        return {
          config: setting.config
        }
      },
      // 设置配置的方法（前端点确定后调用的方法）
      setConfigData(data, { Result }) {
        let config = {}
        for (let [keyPath, value] of Object.entries(data)) {
          lodash.set(config, keyPath, value)
        }
        setting.config = config.config
        setting.setData('config/config', config.config)
        return Result.ok({}, '保存成功~')
      }
    },
  }
}
