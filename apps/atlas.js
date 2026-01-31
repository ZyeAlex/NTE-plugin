import setting from '#setting'
import render from '#render'
import lodash from 'lodash'
import plugin from '#plugin'
// type   skill voice
export const Atlas = plugin({
    name: '[异环助手]图鉴',
    event: 'message',
    priority: 101,
    rule: [
        {
            reg: `^#?(.{1,10}?)(图鉴|卡片|card|Card)$`,
            fnc: atlas
        },
        {
            reg: `^#?(角色列表|全部角色|所有角色)$`,
            fnc: heroList
        }
    ]
})

function atlas(e, reg) {
    // 名称
    let atlasName = e.msg.match(reg)[1]

    if (atlasName == '角色') {
        return heroList(e)
    }
  
    return true
}


/**
    * 角色
    */
// 角色图鉴
async function heroList(e) {
    let heroList = Object.values(setting.heros)
    return e.reply(heroList)
    await render(e, 'hero/list', {
        heros: heroList
    })
}
// 角色信息
