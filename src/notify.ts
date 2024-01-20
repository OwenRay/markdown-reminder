import {PUSHBULLET_TOKEN} from './config'

export async function notify (reminderText: string) {

    const response = await fetch('https://api.pushbullet.com/v2/pushes', {
        method: 'POST',
        headers: {
            'Access-Token': PUSHBULLET_TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: 'note',
            title: 'Reminder',
            body: reminderText
        })
    });

    if (!response.ok) {
        console.warn('Failed to send notification', response.statusText);
    }
}
