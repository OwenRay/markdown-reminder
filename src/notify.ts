import {PUSHBULLET_TOKEN} from './config'

export function notify (s: string) {
    Bun.spawnSync(
        ['curl', '-u', `${PUSHBULLET_TOKEN}:`, '-d', `type=note&title=Reminder&body=${s}`, 'https://api.pushbullet.com/v2/pushes']
    )
}
