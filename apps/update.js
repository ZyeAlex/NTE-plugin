import { execSync } from 'child_process'
import { update } from '../../other/update.js'
import setting from '#setting'
import utils from '#utils'
import fs from 'fs'
import plugin from '#plugin'

let packageJson = JSON.parse(fs.readFileSync(setting.path + '/package.json', 'utf8'));
const name = packageJson.name || 'NTE-plugin'
const version = packageJson.version || Version.version

export const Update = plugin({
  name: '[异环助手]更新',
  event: 'message',
  priority: 100,
  rule: [
    {
      reg: `^#(强制)?更新$`,
      fnc: update_plugin,
      permission: 'master'
    },
    {
      reg: `#更新日志$`,

      fnc: update_log,
      permission: 'master'
    },
 
  ]
})


async function update_plugin(e) {
  let Update_Plugin = new update()
  Update_Plugin.e = e
  Update_Plugin.reply = e.reply

  if (Update_Plugin.getPlugin(name)) {
    if (e.msg.includes('强制')) {
      await execSync('git reset --hard origin/master', { cwd: setting.path })
    }
    await Update_Plugin.runUpdate(name)
    if (Update_Plugin.isUp) {
      setTimeout(() => Update_Plugin.restart(), 2000)
    }
  }
  return true
}

async function update_log(e) {
  let Update_Plugin = new update()
  Update_Plugin.e = e
  Update_Plugin.reply = e.reply

  if (Update_Plugin.getPlugin(name)) {
    e.reply(await Update_Plugin.getLog(name))
  }
  return true
}

